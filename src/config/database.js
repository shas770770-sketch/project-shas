const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'),
  logging: false // מונע הצגת שאילתות SQL ארוכות בטרמינל
});

module.exports = sequelize;