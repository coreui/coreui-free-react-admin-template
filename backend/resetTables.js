// models/index.js

const sequelize = require('./db');

const User = require('./models/User');
const Client = require('./models/Client');
const Contact = require('./models/Contact');
const Project = require('./models/Project');
const Task = require('./models/Task');

// ראשית, מבטלים את הקשרים (Associations)
User.hasMany(Client, { foreignKey: 'userId' });
Client.belongsTo(User, { foreignKey: 'userId' });

Client.hasMany(Project, { foreignKey: 'clientId' });
Project.belongsTo(Client, { foreignKey: 'clientId' });

Client.hasMany(Contact, { foreignKey: 'clientId' });
Contact.belongsTo(Client, { foreignKey: 'clientId' });

Project.hasMany(Task, { foreignKey: 'projectId' });
Task.belongsTo(Project, { foreignKey: 'projectId' });

Task.belongsTo(Client, { foreignKey: 'clientId' });
Client.hasMany(Task, { foreignKey: 'clientId' });

// פונקציה לאיפוס הטבלאות
async function resetTables() {
  try {
    // מבטלים את המודלים
    await sequelize.drop();
    
    // מבצעים סנכרון מחדש לכל הטבלאות
    await sequelize.sync({ force: true });
    
    console.log("All tables were successfully reset and recreated.");
  } catch (error) {
    console.error("Error during table reset:", error);
  }
}

resetTables();
