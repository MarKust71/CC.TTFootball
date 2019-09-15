const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


const dbname = process.env.MONGODB_NAME;
const dbuser = process.env.MONGODB_USER;
const dbpass = process.env.MONGODB_PASS;
mongoose.connect(`mongodb+srv://${dbuser}:${dbpass}@cluster0-wcpwy.mongodb.net/${dbname}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then( () => {
        console.log('DB connected...');
        // console.log(mongoose.modelSchemas.Team);
    })
    .catch( (err) => console.log("Couldn't connect to DB...", err));


const teamSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    players: [ String ],
    divisionId: { type: String, required: false, unique: false }
});

const Team = mongoose.model('Team', teamSchema);
async function createTeam() {
    const team = new Team({
        name: 'Team7',
        players: [ 'Player13', 'Player14' ],
        divisionID: 'WRO'
    });
    const res = await team.save()
        .then( (res) => { console.log(res); } )
        .catch( (err) => { console.log('Something went wrong:', err.errmsg); } );
}
createTeam();

async function getTeams() {
    const teams = await Team.find();
    console.log(teams);
}
getTeams();



router.get('/', (req, res) => {
    if (process.env.TEST_ENV) {
        if (process.env.PORT) {
            res.send(`(1) Hello, players! Welcome on port ${process.env.PORT}! (${process.env.TEST_ENV})`);
        } else {
            res.send(`(2) Hello, players! Welcome on board! (${process.env.TEST_ENV}) (${process.env.PORT_LOCAL})`);
        }
    } else {
        if (process.env.PORT) {
            res.send(`(3) Hello, players! Welcome on port ${process.env.PORT}!`);
        } else {
            res.send(`(4) Hello, players! Welcome on board!`);
        }
    }
})

module.exports = router;