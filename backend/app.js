const express = require('express');
const app = express();

const routerHome = require('./routes/home');

app.use('/', routerHome);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`));
