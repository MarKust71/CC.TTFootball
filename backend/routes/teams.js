const express = require('express');
const router = express.Router();
const mongoose = require('../mk_db.js');
// const mongoose = require('mongoose');
const Player = require('./mk_players');
const Region = require('./mk_regions');


const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    playersId: [ { type: mongoose.Schema.Types.ObjectId,  ref: 'Player'} ],
    regionId: { type: mongoose.Schema.Types.ObjectId,  ref: 'Region'}
});
const Team = mongoose.model('Team', teamSchema);
async function createTeam(name, players, region) {
    const team = new Team({
        name: name,
        playersId: players,
        regionId: region
    });
    await team.save()
        .then( (res) => console.log(res) )
        .catch( (err) => console.log('Something went wrong:', err.errmsg) );
}
// createTeam('Team1', ['5d7e7d992da6aa4260a83d23', '5d7e7d992da6aa4260a83d24'], '5d7e7d992da6aa4260a83d22');

async function getTeams() {
    const result = await Team
        .find()
        .populate('regionId', 'name id -_id')
        .populate('playersId')
        // .then( res => console.log(res) )
        // .then( res => { return res } )
        .catch( err => console.log('Something went wrong...', err));
    console.log(result);
    return result;
}
// getTeams();



router.get('/', (req, res) => {
    getTeams().then( result => { res.send(result) } )
})

router.post('/', (req, res) => {

})


module.exports = router;