const Contact = require('../models/contacts');

async function listContacts() {
  return Contact.find({});
}

async function getById(id) {
  return Contact.findById(id);
}

async function addContact(contact) {
  return Contact.create(contact);
}

async function removeContact(id) {
  return Contact.findByIdAndDelete(id);
}



async function updateContact(id, updatedContact) {
  return Contact.findByIdAndUpdate(id, updatedContact, { new: true });
}

async function updateStatusContact(id, favorite) {
  return Contact.findByIdAndUpdate(id, { favorite }, { new: true });
}

module.exports = {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact
};

  


