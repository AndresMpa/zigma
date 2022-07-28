const setupMetricModel = require('./model/metric');
const setupAgentModel = require('./model/agent');
const setupDatabase = require('./lib/db');

module.exports = async function (config) {
  const MetricModel = setupMetricModel(config);
  const AgentModel = setupAgentModel(config);
  const sequelize = setupDatabase(config);

  AgentModel.hasMany(MetricModel);
  MetricModel.belongsTo(AgentModel);

  await sequelize.authenticate();

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Agent = {};
  const Metric = {};

  return {
    Agent,
    Metric,
  };
};
