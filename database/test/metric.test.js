// Requirements
const { fixtureMetric, fixtureAgent } = require('./fixtures');
const { mockAgent, mockMetric } = require('./mocks');
// Globals
let singleMetric = { ...fixtureMetric.single };
let singleAgent = { ...fixtureAgent.single };
let newSingleMetric = fixtureMetric.getASample;
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
    expect(db.Metric).toBeDefined();
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

describe('[METRIC SERVICE]', () => {
  describe('[Find metric by user UUID]', () => {
    test('Function findByAgentUUID should be called once', async () => {
      await db.Metric.findByAgentUUID(singleAgent.uuid);
      expect(mockMetric.findAll).toBeCalledTimes(1);
    });
    test('Function findByAgentUUID should find an agent by uuid called with the same id', async () => {
      await db.Agent.findByUuid(singleAgent.uuid);
      expect(mockAgent.findOne).toBeCalledWith({
        where: { uuid: singleAgent.uuid },
      });
    });
    test('Function output should be exactly the same', async () => {
      const agentMetric = await mockMetric.findByAgentUUID(singleAgent.uuid);
      expect(agentMetric).toEqual(
        fixtureMetric.findByAgentUUID(singleAgent.uuid)
      );
    });
  });

  describe('[Find metric type by user UUID]', () => {
    test('Function find all should be called once', async () => {
      await db.Metric.findByTypeAgentUUID(singleAgent.uuid);
      expect(mockMetric.findAll).toBeCalledTimes(1);
    });
    test('Function findByAgentUUID should find an agent by uuid called with the same id', async () => {
      await db.Agent.findByUuid(singleAgent.uuid);
      expect(mockAgent.findOne).toBeCalledWith({
        where: { uuid: singleAgent.uuid },
      });
    });
    test('Function output should be exactly the same', async () => {
      const agentMetric = await mockMetric.findByTypeAgentUUID(
        'cpu',
        singleAgent.uuid
      );
      expect(agentMetric).toEqual(
        fixtureMetric.findByTypeAgentUUID('cpu', singleAgent.uuid)
      );
    });
  });

  describe('[Create a metric]', () => {
    test('findOne should be called with filter object with uuid as arg', async () => {
      await db.Agent.findByUuid(singleAgent.uuid);
      expect(mockAgent.findOne).toBeCalledWith({
        where: { uuid: singleAgent.uuid },
      });
    });
    test('create function should be called once', async () => {
      await db.Metric.create(singleAgent.uuid, newSingleMetric);
      expect(mockMetric.create).toBeCalledTimes(1);
    });
  });
});
