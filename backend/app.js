const express = require('express');
const app = express();

const mk_db = require('./mk_db');
const routerHome = require('./routes/home');
const routerTeams = require('./routes/teams');

app.use(express.json());
app.use('/', routerHome);
app.use('/api/teams', routerTeams);

const port = process.env.PORT || Number(process.env.PORT_LOCAL);
app.listen(port, () => console.log(`Listening on port ${port}...`));


