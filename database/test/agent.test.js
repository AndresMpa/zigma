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
  describe('[Find all agents]', () => {
    test('findAll should be called once', async () => {
      await db.Agent.findAll();
      expect(mockAgent.findAll).toBeCalledTimes(1);
    });
    test('findAll should be called without args', async () => {
      await db.Agent.findAll();
      expect(mockAgent.findAll).toBeCalledWith();
    });
  });

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

  describe('[Find agent by UUID]', () => {
    test('findOne should be called once', async () => {
      await db.Agent.findByUuid(single.uuid);
      expect(mockAgent.findOne).toBeCalledTimes(1);
    });
    test('findOne should be called with filter object with uuid as arg', async () => {
      await db.Agent.findByUuid(single.uuid);
      expect(mockAgent.findOne).toBeCalledWith({
        where: { uuid: single.uuid },
      });
    });
  });

  describe('[Find agent by username]', () => {
    test('findAll should be called once', async () => {
      await db.Agent.findByUsername(single.username);
      expect(mockAgent.findAll).toBeCalledTimes(1);
    });
    test('findAll should be called with username and connected filter', async () => {
      await db.Agent.findByUsername(single.username);
      expect(mockAgent.findAll).toBeCalledWith({
        where: { username: single.username, connected: true },
      });
    });
  });

  describe('[Find agend by connection status]', () => {
    test('findAll should be called once', async () => {
      await db.Agent.findByConnected();
      expect(mockAgent.findAll).toBeCalledTimes(1);
    });
    test('findAll should be called with connected filter', async () => {
      await db.Agent.findByConnected();
      expect(mockAgent.findAll).toBeCalledWith({
        where: { connected: true },
      });
    });
  });

  describe('[Update an agent]', () => {
    test('findOne should be called twice', async () => {
      await db.Agent.createOrUpdate(single);
      expect(mockAgent.findOne).toBeCalledTimes(2);
    });
    test('update function should be called once', async () => {
      await db.Agent.createOrUpdate(single);
      expect(mockAgent.update).toBeCalledTimes(1);
    });
  });

  describe('[Create an agent]', () => {
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
