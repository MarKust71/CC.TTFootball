const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {
    const Model = res.locals.models.Team;
    getTeams(Model).then( result => { 
        if (!result.length) {
            res.status(404).send(`Nie znaleziona żadnych drużyn.`);
        } else {
            res.send(result);
        } 
    } )
})

router.get('/:id', (req, res) => {
    const Model = res.locals.models.Team;
    getTeams(Model, req.params.id)
        .then( result => { 
            if (!result) {
                res.status(404).send(`Nie znaleziono drużyny o _ID ${req.params.id}.`);
            } else {
                res.send(result); 
            } 
        } );
})

router.put('/:id', (req, res) => {
    console.log('put->', req.params);
    res.send(`put-> ${req.params}`);
})

router.delete('/:id', (req, res) => {
    const Model = res.locals.models.Team;
    getTeams(Model, req.params.id)
    .then( result => {
        if (!result) {
            res.status(404).send(`Nie znaleziono drużyny o _ID ${req.params.id}.`);
        } else {
        // Team.deleteOne( { id: req.params.id } ).then( (result) => {
        Model.deleteOne( { _id: req.params.id } ).then( (result) => {
            if (result.n) {
                res.send(`Drużyna o _ID ${req.params.id} usunięta.`);
            } else {
                res.status(500).send(`Nic się nie wydarzyło...`);
            }
            }); 
        }
    } );
})

router.post('/', (req, res) => {
    const Model = res.locals.models.Team;
    const teamName = req.body.name;
    const playersFirst = req.body.first;
    const playersSecond = req.body.second;
    const status = req.body.status;
    createTeam(Model, teamName, playersFirst, playersSecond, status)
        .then( 
            result => {
                console.log('res-> ', result); 
                res.send(result)
            },
            err => {
                console.log('Something went wrong (POST)...', err);
                res.status(400).send('Bed request');
            }
        )
})

async function createTeam(Team, name, player1, player2, status) {
    const team = new Team({
        name: name,
        players: { first: player1, second: player2 },
        status: status
    });
    return await team.save()
        .then(
            (res) => { 
                console.log(res); 
                return res; 
            }, 
            (err) => {
                console.log('Something went wrong (createTeam):', err.errmsg);
                return err.errmsg;
            } 
        )
    }

async function getTeams(Team, id) {
    if (id) {
        // return await Team
        return await Team
            .find( { _id: id } )
            // .populate('regionId', 'name id -_id')
            // .populate('playersId')
            .populate('players.first')
            .populate('players.second')
            .then( 
                result => { return result[0]; },
                err => console.log('Something went wrong...', err)
            );
    } else {
        // return await Team
        return await Team
            .find()
            // .populate('regionId', 'name id -_id')
            // .populate('playersId')
            .populate('players.first')
            .populate('players.second')
            .then(
                result => { return result; },
                err => console.log('Something went wrong...', err)
            );   
    }
}




module.exports = router;