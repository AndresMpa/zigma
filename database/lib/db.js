const { Sequelize } = require('sequelize');
let sequelize = null;

function setupDatabase(config) {
  if (!sequelize) {
    sequelize = new Sequelize(config);
  }
  return sequelize;
}

module.exports = setupDatabase;
