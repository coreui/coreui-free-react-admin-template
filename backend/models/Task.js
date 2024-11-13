const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const Task = sequelize.define('Task', {
  taskNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clientName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contactName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  projectName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskSubject: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  approvedHours: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  priority: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  taskDescription: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  attachedFiles: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  clientId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Clients',
      key: 'id',
    },
  }
});

module.exports = Task;
