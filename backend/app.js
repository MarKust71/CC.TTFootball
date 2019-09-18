const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const db = require('./db');
const routerHome = require('./routes/home');
const routerMatch = require('./routes/match');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const main = async () => {
  const app = express();

  // Database configuration
  const connection = await db.connect();
  const models = db.load(connection);
  if (process.env.TEST_ENV || process.env.NODE_ENV) {
    await db.initialize(models);
  }
  db.register(app, connection, models);

  // Global middlewares
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(logger);

  // Routes
  app.use('/', routerHome);
  app.use('/', routerMatch);

  app.use(errorHandler);

  // Listening
  const host = process.env.HOST || '127.0.0.1';
  const port = process.env.PORT || 8080;
  app.listen(port, host, () =>
    console.log(
      `[App] Server is listening on http://${host}:${port}\n` +
        '========================================================',
    ),
  );
};

main();
