const setupMetricModel = require('./model/metric');
const setupAgentModel = require('./model/agent');
const setupMetric = require('./lib/metric');
const setupAgent = require('./lib/angent');
const setupDatabase = require('./lib/db');
const defaults = require('defaults');

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000,
    },
    query: {
      raw: true,
    },
  });
  const MetricModel = setupMetricModel(config);
  const AgentModel = setupAgentModel(config);
  const sequelize = setupDatabase(config);

  AgentModel.hasMany(MetricModel);
  MetricModel.belongsTo(AgentModel);

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true });
  }

  const Agent = setupAgent(AgentModel);
  const Metric = setupMetric(MetricModel, AgentModel);

  return {
    Agent,
    Metric,
  };
};
