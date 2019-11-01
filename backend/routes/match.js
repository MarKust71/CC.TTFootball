const express = require('express');
const router = express.Router();
const _ = require('lodash');
const { auth, getUser } = require('../middleware/auth');
const Joi = require('joi');

router.use('/', auth);

router.get('/:id', async (req, res) => {
  const { Match } = res.locals.models;

  let match = await Match.findOne({ _id: req.params.id })
    .select('-__v -status')
    .populate('teams.first', '-__v -status')
    .populate('teams.second', '-__v -status')
    .populate('league', 'name division');
  if (!match) return res.status(400).send('Taki mecz nie istnieje!');

  res.json(match);
});

router.get('/:id/league', async (req, res) => {
  const { Match } = res.locals.models;

  let matches = await Match
    .find({ league: req.params.id })
    .populate('teams.first', 'name players')
    .populate('teams.second', 'name players')
  if (!matches) return res.status(400).send('Dla takiej ligi mecze nie istnieją!');

  res.json(matches);
});

router.put('/:id/score', async (req, res) => {
  const now = new Date(Date.now());
  const { Match, User } = res.locals.models;

  const areIdsValid = (reqIds, matchIds) =>
    _.uniq(reqIds).length === 2 && _.intersection(reqIds, matchIds).length === 2;

  const reqValueToTeams = (teams, value) => {
    const firstTeam = teams.first;
    const secondTeam = teams.second;
    const [firstTeamReq, secondTeamReq] =
      firstTeam.id === value.firstTeam.id ? [value.firstTeam, value.secondTeam] : [value.secondTeam, value.firstTeam];
    firstTeamReq.isWinner = firstTeamReq.goals > secondTeamReq.goals;
    secondTeamReq.isWinner = firstTeamReq.goals < secondTeamReq.goals;
    firstTeamReq.goalsLost = secondTeamReq.goals;
    secondTeamReq.goalsLost = firstTeamReq.goals;
    return { firstTeam, secondTeam, firstTeamReq, secondTeamReq };
  };

  const updateMatch = (match, first, second) => {
    match.goals.first = first.goals;
    match.goals.second = second.goals;
    match.date.played = now;
    match.status = 'played';
    match.winner = first.isWinner ? 'first' : 'second';
    return match.save();
  };

  const updateStatistics = (doc, req) => {
    req.isWinner ? (doc.statistics.matches.won += 1) : (doc.statistics.matches.lost += 1);
    doc.statistics.goals.for += req.goals;
    doc.statistics.goals.against += req.goalsLost;
  };

  const updateStatisticsAndSave = (doc, req) => {
    updateStatistics(doc, req);
    return doc.save();
  };

  const updateLeagueTeams = (league, first, second) => {
    const updateTeam = req => {
      const selectedTeam = league.teams.find(x => x.team == req.id);
      return updateStatistics(selectedTeam, req);
    };
    updateTeam(first);
    updateTeam(second);
    return league.save();
  };

  const updateTeamWithPlayers = async (team, req) => {
    const players = await User.find({ _id: { $in: [team.players.first, team.players.second] } }).select('statistics');
    return Promise.all([updateStatisticsAndSave(team, req), ...players.map(x => updateStatisticsAndSave(x, req))]);
  };

  const validate = req => {
    const teamSchema = {
      id: Joi.string()
        .min(24)
        .hex()
        .required(),
      goals: Joi.number()
        .min(0)
        .max(10)
        .required(),
    };
    const schema = {
      firstTeam: Joi.compile(teamSchema).required(),
      secondTeam: Joi.compile(teamSchema).required(),
    };
    return Joi.validate(req, schema);
  };

  const { error, value } = validate(req.body);
  if (error) return res.status(400).send(error.details);

  let match = await Match.findOne({ _id: req.params.id })
    .select('-__v')
    .populate('teams.first', '-__v -status')
    .populate('teams.second', '-__v -status')
    .populate('league', '-__v -status');
  if (!match) return res.status(400).send('Taki mecz nie istnieje!');
  if (match.status != 'scheduled') return res.status(400).send('Ten mecz już został rozegrany!');

  const firstTeamId = match.teams.first.id;
  const secondTeamId = match.teams.second.id;
  if (!areIdsValid([value.firstTeam.id, value.secondTeam.id], [firstTeamId, secondTeamId]))
    return res.status(400).send('Podane drużyny nie grają w tym meczu!');

  const user = await getUser(res).populate({ path: 'teams', match: { status: 'active' }, select: '_id' });
  if (!user) return res.status(401).send('Błąd tokena');

  const team = user.teams.find(x => x.id === firstTeamId || x.id === secondTeamId);
  if (!team) return res.status(401).send('Ten użytkownik nie gra w tym meczu!');

  const { firstTeam, secondTeam, firstTeamReq, secondTeamReq } = reqValueToTeams(match.teams, value);

  const session = await Match.startSession();
  await session.withTransaction(async () => {
    await Promise.all([
      updateMatch(match, firstTeamReq, secondTeamReq),
      updateLeagueTeams(match.league, firstTeamReq, secondTeamReq),
      updateTeamWithPlayers(firstTeam, firstTeamReq),
      updateTeamWithPlayers(secondTeam, secondTeamReq),
    ]);
  });

  res.json(match);
});

module.exports = router;
