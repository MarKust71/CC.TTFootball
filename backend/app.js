const express = require('express');
const app = express();
const routerHome = require('./routes/home');
const login = require('./routes/login');
const auth = require('../middleware/auth');

app.use('/', routerHome);
app.use('/api/login', login);

if (!process.env.JWTPRIVATEKEY) {
    console.error('jwtPrivateKey not defined');
    process.exit(1);
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));