const models = require('./models');

const initialize = async db => {
  const connectedModels = {};

  for (let name in models) {
    connectedModels[name] = db.model(name, models[name]);
  }

  return connectedModels;
};

module.exports = initialize;
