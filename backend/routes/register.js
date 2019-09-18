const Joi = require('joi');
const bcrypt = require('bcrypt');
const { User } = require('../models/user');
const express = require('express');
const _ = require('lodash');
const router = express.Router();

router.post('/', async(req, res)=> {
    const {error} = validate(req.body);
    
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: ReadableStream.body.email})
    if (user) return res.status(400).send('Email zajęty!');

    let user = await User.findOne({ login: ReadableStream.body.login})
    if (user) return res.status(400).send('Login zajęty!');

    user = new User(_.pick(req.body, ['login','email','password']));

    const salt = await bcrypt.genSalt(10);
    //const user.password = await bcrypt.hash(user.password, salt); Czeka na model Usera.
    
    await user.save();

    const token = jwt.sign({
      _id: user._id
    }, process.env.JWTPRIVATEKEY);
    res.header('x-auth-token', token).send(_.pick(user,['login','email']));
})

function validate(req) {
    const schema = {
      login: Joi.string().min(5).max(30).required(), //dłuższy login?
      email: Joi.string().min(5).max(255).required().email(),
      password: Joi.string().min(5).max(1024).required()
    };
  
    return Joi.validate(req, schema);
  }

module.exports = router;
