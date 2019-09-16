const initialize = async models => {
  for (let model in models) {
    console.log(`[MongoDB] Initializing data for ${model}`);
  }
};

module.exports = initialize;
