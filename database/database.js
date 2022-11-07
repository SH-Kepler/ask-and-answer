const sequelize = require('sequelize');

const connection = new sequelize('askAndAnswer', 'root', '05012017', {
  host: 'localhost',
  dialect: 'mysql'
});

module.exports = connection;
