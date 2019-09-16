const express = require('express');
const db = require('./db');
const routerHome = require('./routes/home');

const runServer = models => {
  const app = express();
  db.register(app, models);

  app.use('/', routerHome);

  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;
  app.listen(port, host, () => console.log(`Server is listening on http://${host}:${port}`));
};

const main = async () => {
  const connection = await db.connect();
  const models = await db.initialize(connection);
  runServer(models);
};

main();
