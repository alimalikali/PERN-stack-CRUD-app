const { Sequelize } = require('sequelize');

// Create a new Sequelize instance
const sequelize = new Sequelize('pern1_db', 'postgres', 'ALIMALIKALIMALIK1234', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
