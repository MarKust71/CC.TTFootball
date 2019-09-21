const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const path = require('path');
const db = require('./db');
const routerHome = require('./routes/home');
const routerLeague = require('./routes/league');
const routerMatch = require('./routes/match');
const routerRegister = require('./routes/register');
const routerLogin = require('./routes/login');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const auth = require('./middleware/auth');

const main = async () => {
  const app = express();

  if (!process.env.JWTPRIVATEKEY) {
    console.error('jwtPrivateKey not defined');
    process.exit(1);
  }

  // Database configuration
  const connection = await db.connect();
  const models = db.load(connection);
  if (process.env.TEST_ENV || process.env.NODE_ENV) {
    await connection.dropDatabase();
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
  app.use('/api/leagues', routerLeague);
  app.use('/api/login', routerLogin);
  app.use('/', routerMatch);
  app.use('/api/register', routerRegister);

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
