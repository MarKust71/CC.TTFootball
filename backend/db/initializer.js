const userInitializer = async () => {};

const teamInitializer = async () => {};

const divisionInitializer = async () => {};

const leagueInitializer = async () => {};

const matchInitializer = async () => {};

const initializers = new Map([
  ['User', userInitializer],
  ['Team', teamInitializer],
  ['Division', divisionInitializer],
  ['League', leagueInitializer],
  ['Match', matchInitializer],
]);

const initialize = async models => {
  for (let modelName in models) {
    const model = models[modelName];
    if ((await model.countDocuments()) === 0) {
      if (!initializers.has(modelName)) {
        console.log(`[MongoDB] Could not find initializer for ${modelName}`);
        continue;
      }
      console.log(`[MongoDB] Initializing data for ${modelName}`);
      const initializer = initializers.get(modelName);
      await initializer(model);
    }
  }
};

module.exports = initialize;
