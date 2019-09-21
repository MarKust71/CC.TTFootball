const Joi = require('joi');
const { League } = require('../db/models');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.get('/', async (req, res) => {
  const leagues = await res.locals.models.League.find().sort('name');
  res.send(leagues);
});

router.get('/:name', async (req, res) => {
  const league = await res.locals.models.League.findOne({ name: req.params.name });

  if (!league) return res.status(404).send('Nie znaleziono takiej ligi');

  res.send(league);
});

router.post('/', async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let league = await res.locals.models.League.findOne({ name: req.body.name });
  if (league) return res.status(400).send('Taka liga juz istnieje!');

  league = new League(_.pick(req.body, ['name', 'description', 'division', 'numOfTeams', 'status', 'date']));

  await league.save();
  res.send(league);
});

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
      .max(15)
      .required(),
    date: Joi.object.keys({
      started: Joi.date().required(),
    }),
  };
  return Joi.validate(req, schema);
}

module.exports = router;
