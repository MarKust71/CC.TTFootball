const config = require('config');
const express = require('express');
const app = express();
const register = require('./routes/register');
const routerHome = require('./routes/home');
const login = require('./routes/login');

app.use('/', routerHome);
app.use('/api/login', login);
app.use('/api/register', register)

if (!config.get('jwtPrivateKey')) {
    console.error('jwtPrivateKey not defined');
    process.exit(1);
}

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));