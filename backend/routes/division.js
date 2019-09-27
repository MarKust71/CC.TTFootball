const Joi = require('joi');
const express = require('express');
const _ = require('lodash');
const router = express.Router();
const { auth } = require('../middleware/auth');

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { Division } = res.locals.models;
  const division = await Division.findById(id);
  if (!division) res.send('Nie ma dywizji o takim id, sory :(');
  res.json(division);
});

router.get('/', async (req, res) => {
  const { Division } = res.locals.models;
  const division = await Division.find().sort('name');
  // const division = await Division.findByIdOrName(req.params.id);
  if (!division) res.send('Nie istnieje jeszcze żadna dywizja, ale twoja może być pierwszą! :)');
  res.json(division);
});

router.post('/', auth, async (req, res) => {
  const { Division } = res.locals.models;

  function validate(req) {
    const schema = {
      _id: Joi.string()
        .min(3)
        .max(3),
      description: Joi.string().max(255),
    };
    return Joi.validate(req, schema);
  }

  const { error, value } = validate(req.body);

  if (error) return res.status(400).json(error.details);

  let division = await res.locals.models.Division.findOne({ _id: value._id });
  if (division) return res.status(400).send('Dywizja o podanym id juz istnieje!');

  division = new Division({ ...value });

  await division.save();
  res.json(division);
});

module.exports = router;