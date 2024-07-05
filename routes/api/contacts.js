const express = require('express');
const router = express.Router();
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
} = require('../../controllers/contactsController');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      res.status(400).json({ message: 'missing required name field' });
    } else {
      const newContact = await addContact({ name, email, phone });
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await removeContact(id);
    if (result) {
      res.status(200).json({ message: 'Contact deleted successfully' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    if (!name && !email && !phone) {
      res.status(400).json({ message: 'missing fields' });
    } else {
      const updatedContact = await updateContact(id, { name, email, phone });
      if (updatedContact) {
        res.status(200).json(updatedContact);
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (favorite === undefined) {
      res.status(400).json({ message: 'missing field favorite' });
    } else {
      const updatedContact = await updateStatusContact(contactId, favorite);
      if (updatedContact) {
        res.status(200).json(updatedContact);
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

