// Globals
let config = { logging: function () {} };
let mockMetricModel = null;
let mockAgentModel = null;
let db = null;

// Test setup
beforeEach(async () => {
  mockMetricModel = {
    belongsTo: jest.fn(),
  };
  mockAgentModel = {
    hasMany: jest.fn(),
  };

  const setupDatabase = require('../index');

  jest.mock('../model/agent', () => jest.fn(() => mockAgentModel));
  jest.mock('../model/metric', () => jest.fn(() => mockMetricModel));

  db = await setupDatabase(config);
});

// Clean up test
afterEach(() => {
  jest.resetModules();
  jest.clearAllMocks();
});

// Agent test
describe('Agent', () => {
  test('The agent should exists', () => {
    expect(db.Agent).toBeDefined();
  });

  test('setupAgentModel.hasMany should be called', () => {
    expect(mockAgentModel.hasMany).toHaveBeenCalled();
  });

  test('setupMetricModel.belongsTo should be called', () => {
    expect(mockMetricModel.belongsTo).toHaveBeenCalled();
  });

  test('setupAgentModel.hasMany should be called with mockMetricModel', () => {
    expect(mockAgentModel.hasMany).toHaveBeenCalledWith(mockMetricModel);
  });

  test('setupMetricModel.belongsTo should be called with mockAgentModel', () => {
    expect(mockMetricModel.belongsTo).toHaveBeenCalledWith(mockAgentModel);
  });
});
