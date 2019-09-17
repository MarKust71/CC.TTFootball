const express = require('express');
const router = express.Router();
const mongoose = require('../mk_db.js');
// const mongoose = require('mongoose');
const Player = require('./mk_players');
const Region = require('./mk_regions');


const teamSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    playersId: [ { type: mongoose.Schema.Types.ObjectId,  ref: 'Player'} ],
    regionId: { type: mongoose.Schema.Types.ObjectId,  ref: 'Region'},
    isDeleted: { type: Boolean }
});
const Team = mongoose.model('Team', teamSchema);
async function createTeam(name, players, region) {
    const team = new Team({
        id: await getMaxTeamId()
        .then( (res) => { return res + 1; } )
        .catch( (err) => { console.log('Something went wrong (new getMax):', err.errmsg); return -1 } ),
        name: name,
        playersId: players,
        regionId: region,
        isDeleted: false
    });
    return await team.save()
        .then( (res) => { 
            console.log(res); 
            return res; 
        } )
        .catch( (err) => {
            console.log('Something went wrong (createTeam):', err.errmsg);
            return err.errmsg;
        } );
}
// createTeam('Team3', ['5d7e7d992da6aa4260a83d23', '5d7e7d992da6aa4260a83d24'], '5d7e7d992da6aa4260a83d22');

async function getMaxTeamId() {
    return await Team
        .find()
        .sort( {id : -1} )
        .limit(1)
        .then( (res) => { return res[0].id } )
        .catch( (err) => { console.log('Something went wrong (getMax):', err.message); return -1; } );
}

async function getTeams(id) {
    if (id) {
        return await Team
            .find( { id: id } )
            .populate('regionId', 'name id -_id')
            .populate('playersId')
            // .then( result => { console.log(result[0]); } )
            .then( result => { return result[0]; } )
            .catch( err => console.log('Something went wrong...', err));
    } else {
        // const result = await Team
        return await Team
            .find()
            .populate('regionId', 'name id -_id')
            .populate('playersId')
            .catch( err => console.log('Something went wrong...', err));
    }
}
// getTeams();



router.get('/', (req, res) => {
    getTeams().then( result => { res.send(result) } )
})

router.get('/:id', (req, res) => {
    // getTeams(req.params.id)
    //     .then( result => { res.send(result) } );

    getTeams(req.params.id)
        .then( result => { 
            if (!result) res.status(404).send(`Team ID: ${req.params.id} not found`); 
            res.send(result); 
        } );

        // const id = req.params.id;
    // const team = await getTeams(id).then( result => { return result; } );
    // if (!team) res.status(404).send(`Team ID: ${id} not found`);
    // res.send(team);
})

router.put('/:id', (req, res) => {
    console.log('put->', req.params.id);
    res.send(`put-> ${req.params.id}`);
})

router.post('/', (req, res) => {
    const teamName = req.body.name;
    const playersArray = req.body.players;
    const regionId = req.body.region;
    // createTeam('Team2', ['5d7e7d992da6aa4260a83d23', '5d7e7d992da6aa4260a83d24'], '5d7e7d992da6aa4260a83d22')
    createTeam(teamName, playersArray, regionId)
        .then( result => { console.log('res-> ', result); res.send(result) })
        .catch( err => {
            console.log('Something went wrong (POST)...', err);
            res.status(400).send('Bed request');
        });
})


module.exports = router;