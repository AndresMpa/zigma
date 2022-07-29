const { fixtureAgent } = require('../fixtures');

module.exports = {
  hasMany: jest.fn(),
  findById: jest.fn(async (id) => await fixtureAgent.byId(id)),
  findOne: jest.fn(
    async (filter) => await fixtureAgent.byUuid(filter.where.uuid)
  ),
  findAll: jest.fn(async () => fixtureAgent.all),
  update: jest.fn((single) => Promise.resolve(single)),
  create: jest.fn((single) =>
    Promise.resolve({
      toJSON() {
        return single;
      },
    })
  ),
};
