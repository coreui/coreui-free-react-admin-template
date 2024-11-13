const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Connection = sequelize.define('Connection', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clients',
      key: 'id',
    },
  },
  type2: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  clientId2: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clients',
      key: 'id',
    },
  },
});

module.exports = Connection;
