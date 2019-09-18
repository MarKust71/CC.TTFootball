const express = require('express');
const db = require('./db');
const routerHome = require('./routes/home');
const ligue = require('./routes/ligue');

const main = async () => {
  const connection = await db.connect();
  const models = db.load(connection);
  if (process.env.TEST_ENV || process.env.NODE_ENV) {
    await db.initialize(models);
  }

  const app = express();
  db.register(app, connection, models);

  app.use('/', routerHome);
  app.use('/', ligue);

  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;
  app.listen(port, host, () => console.log(`Server is listening on http://${host}:${port}`));
};

main();
