const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {
  User
} = require('../models/user');
const express = require('express');
const router = express.Router();

router.get('/me', auth, async (req, res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
});

router.post('/', async (req, res) => {
  const {
    error
  } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('Błędny email lub hasło');

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Błędny email lub hasło');


  const token = jwt.sign({
    _id: user._id
  }, process.env.JWTPRIVATEKEY);

  res.header('x-auth-token', token).send(_.pick(user,['email']));
});

function validate(req) {
  const schema = {
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;