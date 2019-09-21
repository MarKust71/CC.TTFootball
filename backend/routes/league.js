const Joi = require('joi')
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', async (req, res) => {
  const League = res.locals.models.League;

  const leagues = await League.find().sort('name');
  res.send(leagues);
});

router.get('/:id', async (req, res) => {
  const League = res.locals.models.League;

  const league = await League.findByIdOrName(req.params.id);
  if (!league) return res.status(404).send('Nie znaleziono takiej ligi');

  res.send(league);
});

router.post('/', async (req, res) => {
  const League = res.locals.models.League;
  function validate(req) {
    const schema = {
      name: Joi.string()
        .min(5)
        .max(30)
        .required(),
      description: Joi.string().max(255),
      division: Joi.string()
        .min(3)
        .max(20)
        .required(),
      status: Joi.string()
        .min(3)
        .max(15),
       date: Joi.object({
         started: Joi.date().required(),
       }),
    };
    return Joi.validate(req, schema);
  }

  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let league = await res.locals.models.League.findOne({ name: req.body.name });
  if (league) return res.status(400).send('Taka liga juz istnieje!');

  league = new League(_.pick(req.body, ['name', 'description', 'division', 'status', 'date']));

  await league.save();
  res.json(league);
});

router.put('/:id/start', async (req, res) => {
  const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  const parseDates = (now, reqStart, reqEnd) => {
    const parseDate = (now, reqDate) => {
      const date = new Date(reqDate);
      return _.isDate(date) && date > now ? date : now;
    };
    let start = parseDate(now, reqStart);
    const newEnd = new Date(new Date(start).setMonth(start.getMonth() + 2));
    let end = parseDate(now, reqEnd) || newEnd;
    if (start.getTime() >= end.getTime()) {
      end = newEnd;
    }
    return { start, end };
  };

  const League = res.locals.models.League;
  const Match = res.locals.models.Match;

  const league = await League.findByIdOrName(req.params.id);
  if (!league) return res.status(404).send('Nie znaleziono takiej ligi');
  if (league.status !== 'created') return res.status(400).send('Ta liga już wystartowała');

  const now = new Date(Date.now());
  const { start, end } = parseDates(now, req.body.start, req.body.end);

  const teams = _.shuffle(league.teams);
  const matchesData = [];
  teams.forEach((x, i) => {
    teams.slice(i + 1, teams.length).forEach(y => {
      matchesData.push({
        teams: {
          first: x.team,
          second: y.team,
        },
        status: 'scheduled',
        date: { scheduled: randomDate(start, end) },
      });
    });
  });

  const session = await League.startSession();
  await session.withTransaction(async () => {
    const matches = await Match.insertMany(matchesData);
    league.matches.push(...matches);
    league.status = 'pending';
    league.date.started = now;
    await league.save();
  });

  res.json(league);
});

module.exports = router;
