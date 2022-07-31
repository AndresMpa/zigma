const { handleFatalError } = require('../util');
const { config } = require('../config');
const db = require('../');

async function run() {
  const { Agent, Metric } = await db(config.db).catch(handleFatalError);

  console.group('--AGENT');

  const agent = await Agent.createOrUpdate({
    uuid: 'tes-tov-erc',
    name: 'Testman From Codd',
    username: 'Testman',
    hostname: 'testlocal',
    pid: 1,
    connected: true,
  }).catch(handleFatalError);

  console.group('--Agent creation');
  console.log(agent);
  console.groupEnd('--Agent creation');

  const agents = await Agent.findAll().catch(handleFatalError);

  console.group('--All agent');
  console.log(agents);
  console.groupEnd('--All agent');

  console.groupEnd('--AGENT');

  console.group('--METRIC');

  const metrics = await Metric.findByAgentUUID(agent.uuid).catch(
    handleFatalError
  );
  console.group(`--Metric for ${agent.uuid}`);
  console.log(metrics);
  console.groupEnd(`--Metric for ${agent.uuid}`);

  const metric = await Metric.create(agent.uuid, {
    type: 'memory',
    value: '300',
  }).catch(handleFatalError);

  console.group(`--Metric creation`);
  console.log(metric);
  console.groupEnd(`--Metric creation`);

  const metricsByType = await Metric.findByTypeAgentUUID(
    'memory',
    agent.uuid
  ).catch(handleFatalError);

  console.group(`--Memory metric`);
  console.log(metricsByType);
  console.groupEnd(`--Memory metric`);

  console.groupEnd('--METRIC');
}

run();
