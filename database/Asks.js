const sequelize = require('sequelize');
const connection = require('./database')

const Pergunta = connection.define('asks', {
  title: {
    type: sequelize.STRING,
    allowNull: false
  },
  description: {
    type: sequelize.TEXT,
    allowNull: false
  }
});

Pergunta.sync({force: false}).then(() => {});

module.exports = Pergunta;
