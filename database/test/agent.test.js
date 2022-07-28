let config = {
  logging: () => {},
};
let db = null;

beforeEach(async () => {
  const setupDatabase = require('../');
  db = await setupDatabase(config);
});

test('Test if agent exists', () => {
  expect(db.Agent).toBeTruthy();
});
