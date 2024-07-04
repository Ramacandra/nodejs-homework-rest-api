const express = require('express');
const router = express.Router();
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact
} = require('../../controllers/contactsController'); 

router.get('/', (req, res, next) => {
  const contacts = listContacts();
  res.status(200).json(contacts);
});

router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  const contact = getById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.post('/', (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400).json({ message: 'missing required name field' });
  } else {
    const newContact = addContact({ name, email, phone });
    res.status(201).json(newContact);
  }
});

router.delete('/:id', (req, res, next) => {
  const { id } = req.params;
  const result = removeContact(id);
  if (result) {
    res.status(200).json({ message: 'contacto eliminado' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

router.put('/:id', (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    res.status(400).json({ message: 'missing fields' });
  } else {
    const updatedContact = updateContact(id, { name, email, phone });
    if (updatedContact) {
      res.status(200).json(updatedContact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  }
});

module.exports = router;
