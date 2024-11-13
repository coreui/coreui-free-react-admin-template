const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('BrainPortal', 'sa', 'B1Admin', {
  host: 'localhost',
  dialect: 'mssql',
  dialectOptions: {
    options: {
      encrypt: true,
      trustServerCertificate: true, 
    },
  },
})
module.exports = sequelize
