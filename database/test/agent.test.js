// Requirements
const { mockAgent, mockMetric } = require('./mocks');
const { fixtureAgent } = require('./fixtures');
// Globals
let single = { ...fixtureAgent.single };
let newSingle = fixtureAgent.getASample;
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
describe('[SETUP]', () => {
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

describe('[AGENT SERVICE]', () => {
  describe('[Find agent by ID]', () => {
    test('Function findById should be called once', async () => {
      await db.Agent.findById(single.id);
      expect(mockAgent.findById).toBeCalledTimes(1);
    });
    test('Function findById should be called with the same id', async () => {
      await db.Agent.findById(single.id);
      expect(mockAgent.findById).toBeCalledWith(single.id);
    });
    test('Function output should be exactly the same', async () => {
      const agent = await mockAgent.findById(single.id);
      expect(agent).toEqual(fixtureAgent.byId(single.id));
    });
  });

  describe('[Update and agent]', () => {
    test('findOne should be called twice', async () => {
      await db.Agent.createOrUpdate(single);
      expect(mockAgent.findOne).toBeCalledTimes(2);
    });
    test('update function should be called once', async () => {
      await db.Agent.createOrUpdate(single);
      expect(mockAgent.update).toBeCalledTimes(1);
    });
  });

  describe('[Create and agent]', () => {
    test('findOne function should be called once', async () => {
      await db.Agent.createOrUpdate(newSingle);
      expect(mockAgent.findOne).toBeCalledTimes(1);
    });
    test('create function should be called once', async () => {
      await db.Agent.createOrUpdate(newSingle);
      expect(mockAgent.create).toBeCalledTimes(1);
    });
    test("update function shouldn't be called", async () => {
      await db.Agent.createOrUpdate(newSingle);
      expect(mockAgent.update).toBeCalledTimes(0);
    });
  });
});
