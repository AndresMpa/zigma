const { fixtureMetric } = require('../fixtures');

module.exports = {
  belongsTo: jest.fn(),
  findAll: jest.fn(async () => fixtureMetric.all),
  findByAgentUUID: jest.fn(async (uuid) => fixtureMetric.findByAgentUUID(uuid)),
  findByTypeAgentUUID: jest.fn(async (type, uuid) =>
    fixtureMetric.findByTypeAgentUUID(type, uuid)
  ),
  create: jest.fn((single) =>
    Promise.resolve({
      toJSON() {
        return single;
      },
    })
  ),
};
