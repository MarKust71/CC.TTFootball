const register = (app, models) => {
  app.use((req, res, next) => {
    res.locals.models = models;
    next();
  });
  return app;
};

module.exports = register;
