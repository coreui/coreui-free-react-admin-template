const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Project = sequelize.define('Project', {
  projectNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  isFrozen: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  budget: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  remainingBudget: {
    type: DataTypes.FLOAT,
    allowNull: true,
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
  }
}); // <-- Correct closing parenthesis here

module.exports = Project;
