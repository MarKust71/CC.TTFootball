const express = require('express');
const router = express.Router();
const mongoose = require('../mk_db.js');
// const mongoose = require('mongoose');


const Player = mongoose.model('Player', new mongoose.Schema({
    name: String,
    email: String,
    password: String
}));
async function createPlayer(name, email, pass) {
    const player = new Player({
        name: name,
        email: email,
        password: pass,
        region: String
    });
    await player.save()
        .then( (res) => console.log(res) )
        .catch( (err) => console.log('Something went wrong:', err.errmsg) );
}
// createPlayer('Player1', 'player1@foo.com', '1234');
// createPlayer('Player2', 'player2@foo.com', '1234');


module.exports = router;
module.exports = Player;
