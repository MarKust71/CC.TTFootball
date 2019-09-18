const Joi = require('joi'); 
const { Ligue } = require('../models/user'); 
const express = require('express'); 
const _ = require('lodash'); 
const router = express.Router(); 
 
router.post('/', async(req, res)=> { 
    const {error} = validate(req.body); 
     
    if (error) return res.status(400).send(error.details[0].message); 
 
    let ligue = await Ligue.findOne({ name: ReadableStream.body.name}) 
    if (ligue) return res.status(400).send('Taka liga juz istnieje!'); 
 
    ligue = new Ligue(_.pick(req.body, ['name','description','division','numOfTeams','status','date'])); 
 
    await ligue.save(); 
    res.send(ligue); 
}) 
 
function validate(req) { 
    const schema = { 
      name: Joi.string().min(5).max(30).required(), 
      description: Joi.string().max(255),
      division: Joi.string().min(3).max(20).required(), 
      status: Joi.string().min(3).max(15).required(),
      date: Joi.object.keys({
        started: Joi.date().required()
      })
    }
};

module.exports = router;