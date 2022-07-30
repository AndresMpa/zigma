// Requirements
const { mockAgent, mockMetric } = require('./mocks');
const { fixtureMetric } = require('./fixtures');
// Globals
let single = { ...fixtureMetric.single };
let newSingle = fixtureMetric.getASample;
let config = { logging: function () {} };
let db = null;
