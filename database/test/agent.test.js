// Requirements
const { mockAgent, mockMetric } = require('./mocks');
const { fixtureAgent } = require('./fixtures');
// Globals
let single = { ...fixtureAgent.single };
let config = { logging: function () {} };
let db = null;

// Test setup
beforeEach(async () => {
  const setupDatabase = require('../index');

  jest.mock('../model/metric', () => jest.fn(() => mockMetric));
  jest.mock('../model/agent', () => jest.fn(() => mockAgent));

  db = await setupDatabase(config);
});

// Clean up test
afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

// Test
describe('Setup', () => {
  test('The agent should exists', () => {
    expect(db.Agent).toBeDefined();
  });
  test('setupAgentModel.hasMany should be called', () => {
    expect(mockAgent.hasMany).toHaveBeenCalled();
  });
  test('setupMetricModel.belongsTo should be called', () => {
    expect(mockMetric.belongsTo).toHaveBeenCalled();
  });
  test('setupAgentModel.hasMany should be called with mockMetric', () => {
    expect(mockAgent.hasMany).toHaveBeenCalledWith(mockMetric);
  });
  test('setupMetricModel.belongsTo should be called with mockAgent', () => {
    expect(mockMetric.belongsTo).toHaveBeenCalledWith(mockAgent);
  });
});

describe('Agent service', () => {
  describe('FindById feature', () => {
    test('Function should be called once', async () => {
      await db.Agent.findById(single.id);
      expect(mockAgent.findById).toBeCalledTimes(1);
    });
    test('Function should be called with the same id', async () => {
      await db.Agent.findById(single.id);
      expect(mockAgent.findById).toBeCalledWith(single.id);
    });
    test('Function should be exactly the same', async () => {
      const agent = await mockAgent.findById(single.id);
      expect(agent).toEqual(fixtureAgent.byId(single.id));
    });
  });
});
