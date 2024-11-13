const express = require('express');
const cors = require('cors');
const sequelize = require('./db'); // התחברות למסד הנתונים
const User = require('./models/User');
const Client = require('./models/Client');
const Contact = require('./models/Contact');
const Project = require('./models/Project');
const Task = require('./models/Task');
const Connection = require('./models/Connection');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// התחברות למסד הנתונים
sequelize.sync({ alter: true, logging: console.log })
  .then(() => {
    console.log('All tables created without foreign keys.');
  })
  .catch((error) => {
    console.error('An error occurred while synchronizing the models:', error);
  });

// יצירת משתמש חדש
app.post('/users', async (req, res) => {
  try {
    const { name, email, role, country } = req.body;
    const user = await User.create({ name, email, role, country });
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// קבלת כל המשתמשים
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// יצירת לקוח חדש
app.post('/clients', async (req, res) => {
  try {
    const { name, email, phone, type, country } = req.body;
    const client = await Client.create({ name, email, phone, type, country });
    res.status(201).json(client);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// קבלת כל הלקוחות
app.get('/clients', async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve clients' });
  }
});

// עדכון לקוח קיים
app.put('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      await client.update(req.body);
      res.json(client);
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update client' });
  }
});

// מחיקת לקוח
app.delete('/clients/:id', async (req, res) => {
  try {
    const client = await Client.findByPk(req.params.id);
    if (client) {
      await client.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Client not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete client' });
  }
});

// קבלת אנשי קשר של לקוח מסוים
app.get('/clients/:clientId/contacts', async (req, res) => {
  try {
    const contacts = await Contact.findAll({ where: { clientId: req.params.clientId } });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve contacts' });
  }
});

// יצירת איש קשר חדש עבור לקוח מסוים
app.post('/clients/:clientId/contacts', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const contact = await Contact.create({ clientId: req.params.clientId, name, email, phone });
    res.status(201).json(contact);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// עדכון איש קשר קיים
app.put('/clients/:clientId/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (contact) {
      await contact.update(req.body);
      res.json(contact);
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update contact' });
  }
});

// מחיקת איש קשר
app.delete('/clients/:clientId/contacts/:id', async (req, res) => {
  try {
    const contact = await Contact.findByPk(req.params.id);
    if (contact) {
      await contact.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Contact not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete contact' });
  }
});

// קבלת פרויקטים של לקוח מסוים
app.get('/clients/:clientId/projects', async (req, res) => {
  try {
    const projects = await Project.findAll({ where: { clientId: req.params.clientId } });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve projects' });
  }
});

// יצירת פרויקט חדש עבור לקוח מסוים
app.post('/clients/:clientId/projects', async (req, res) => {
  try {
    const { projectNumber, clientName, projectName, projectType, isFrozen, budget, remainingBudget, notes } = req.body;
    const project = await Project.create({
      clientId: req.params.clientId,
      projectNumber,
      clientName,
      projectName,
      projectType,
      isFrozen,
      budget,
      remainingBudget,
      notes
    });
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// עדכון פרויקט קיים
app.put('/clients/:clientId/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.update(req.body);
      res.json(project);
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
});

// מחיקת פרויקט
app.delete('/clients/:clientId/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByPk(req.params.id);
    if (project) {
      await project.destroy();
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
});

// הפעלת השרת
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
