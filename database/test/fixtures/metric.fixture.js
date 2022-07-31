const agentData = require('./agent.fixture');

const metric = {
  id: 1,
  agentId: 1,
  value: '3%',
  type: 'cpu',
  createdAt: new Date(),
  updatedAt: new Date(),
};

const metrics = [
  metric,
  {
    ...metric,
    id: 2,
    agentId: 1,
    type: 'RAM',
    value: '38%',
  },
  {
    ...metric,
    id: 3,

    agentId: 1,
    type: 'fan',
    value: '41°C',
  },
  {
    ...metric,
    id: 4,
    agentId: 4,
    type: 'RAM',
    value: '10%',
  },
  {
    ...metric,
    id: 5,
    agentId: 3,
    type: 'fan',
    value: '65°C',
  },
  {
    ...metric,
    id: 6,
    agentId: 6,
    type: 'cpu',
    value: '15%',
  },
];

module.exports = {
  all: metrics,
  single: metric,
  findOne: (id) => metrics.filter((metric) => metric.id === id),
  findByAgentUUID: (uuid) => {
    const agentOwner = agentData.byUuid(uuid);
    const result = metrics.filter((metric) => metric.agentId === agentOwner.id);
    return result;
  },
  findByTypeAgentUUID: (type, uuid) => {
    const agentOwner = agentData.byUuid(uuid);
    const metric = metrics.filter(
      (metric) => metric.agentId === agentOwner.id && metric.type === type
    );
    return metric;
  },
  getASample: () => {
    return {
      ...metric,
      id: 8,
      agentId: 1,
      type: 'cpu',
      value: '8%',
    };
  },
};
