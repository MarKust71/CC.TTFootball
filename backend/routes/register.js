const Joi = require('joi');
const bcrypt = require('bcrypt');
// const { User } = require('../db/models');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.post('/', async (req, res) => {
  const { User } = res.locals.models;
  const { error } = validate(req.body);
  console.log(error);
  if (error) return res.status(400).send(error.details[0].message);

  const userEmail = await User.findOne({ email: req.body.email });
  if (userEmail) return res.status(400).send('Email zajęty!');

  const userLogin = await User.findOne({ login: req.body.nickname });
  if (userLogin) return res.status(400).send('Login zajęty!');

  const user = new User(_.pick(req.body, ['nickname', 'email', 'password', 'name', 'surname', 'division']));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();
  res.send(_.pick(user, ['nickname', 'email', 'name', 'surname']));
});

function validate(req) {
  const schema = {
    nickname: Joi.string()
      .min(5)
      .max(30)
      .required(),
    email: Joi.string()
      .min(5)
      .max(255)
      .required()
      .email(),
    password: Joi.string()
      .min(5)
      .max(1024)
      .required(),
    name: Joi.string().max(30),
    surname: Joi.string().max(30),
    division: Joi.string()
      .max(3)
      .required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
