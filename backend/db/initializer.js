const transactional = initializer => async (model, models) => {
  const session = await model.startSession();
  await session.withTransaction(async () => {
    await initializer(model, models);
  });
};

const createModelBatch = async (model, data) => {
  const createdDocuments = [];
  for (let modelData of data) {
    const createdDocument = new model(modelData);
    createdDocuments.push(createdDocument);
    await createdDocument.save();
  }
  return createdDocuments;
};

const arrayWithCount = count => fn => [...Array(count).keys()].map(fn);

const createDivisions = async (prefix, count, models) => {
  const divisionData = arrayWithCount(count)(x => {
    return {
      name: prefix + 'Division_' + x,
    };
  });
  return await createModelBatch(models.Division, divisionData);
};

const createDivision = async (prefix, models) => {
  const divisions = await createDivisions(prefix, 1, models);
  return divisions[0];
};

const createUsers = async (prefix, count, division, models) => {
  const userData = arrayWithCount(count)(x => {
    return {
      nickname: prefix + 'User_' + x,
      email: prefix + 'User_' + x + '@email.com',
      password: '12312edasd13wsd12',
      division: division,
    };
  });
  return await createModelBatch(models.User, userData);
};

const createTeams = async (prefix, count, users, models) => {
  const teamsData = arrayWithCount(count)(x => {
    return {
      name: prefix + 'Team_' + x,
      players: {
        first: users[x],
        second: users[users.length - 1 - x],
      },
      status: 'active',
    };
  });
  return await createModelBatch(models.Team, teamsData);
};

const createLeagues = async (prefix, count, manyTeams, division, date, models) => {
  const leagueData = arrayWithCount(count)(x => {
    return {
      name: prefix + 'League_' + x,
      division: division,
      numOfTeams: {
        min: 0,
        max: 32,
      },
      teams: manyTeams[x].map(team => {
        return { team };
      }),
      status: 'created',
      date: {
        started: date,
      },
    };
  });

  return await createModelBatch(models.League, leagueData);
};

const createLeague = async (prefix, teams, division, date, models) => {
  const leagues = await createLeagues(prefix, 1, [teams], division, date, models);
  return leagues[0];
};

const alignTeamsToUsers = async teams => {
  for (let team of teams) {
    const { first, second } = team.players;
    await first.updateOne({ $push: { teams: team } });
    await second.updateOne({ $push: { teams: team } });
  }
};

const alignLeaguesToDivision = async (leagues, division) => {
  await division.updateOne({ $push: { leagues: { $each: leagues } } });
};

const userInitializer = async () => {};

const teamInitializer = async () => {};

const divisionInitializer = async () => {};

const leagueInitializer = async (League, models) => {
  const prefix = 'League_';
  const division = await createDivision(prefix, models);
  const users = await createUsers(prefix, 10, division, models);
  const teams = await createTeams(prefix, 5, users, models);
  await alignTeamsToUsers(teams);
  const league = await createLeague('', teams, division, new Date(2020, 12, 1), models);
  await alignLeaguesToDivision([league], division);
};

const matchInitializer = async () => {};

const defaultInitializers = new Map([
  ['User', userInitializer],
  ['Team', teamInitializer],
  ['Division', divisionInitializer],
  ['League', leagueInitializer],
  ['Match', matchInitializer],
]);

const initialize = async (models, filterFn = () => true, initializers = defaultInitializers) => {
  for (let modelName of Object.keys(models).filter(filterFn)) {
    const model = models[modelName];
    if (!initializers.has(modelName)) {
      console.log(`[MongoDB] Could not find initializer for ${modelName}`);
      continue;
    }
    console.log(`[MongoDB] Initializing data for ${modelName}`);
    const initializer = initializers.get(modelName);
    await transactional(initializer)(model, models);
  }
};

module.exports = initialize;
