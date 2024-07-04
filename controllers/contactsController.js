const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, '..', 'models', 'contacts.json');

async function listContacts() {
    const data = await fs.readFile(contactsPath, 'utf8');
    return JSON.parse(data);
}

async function getById(id) {
    const contacts = await listContacts();
    return contacts.find(contact => contact.id === id) || null;
}

async function addContact(contact) {
    const contacts = await listContacts();
    const newContact = { id: uuidv4(), ...contact };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
}

async function removeContact(id) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) return null;
    const [removedContact] = contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return removedContact;
}

async function updateContact(id, updatedContact) {
    const contacts = await listContacts();
    const index = contacts.findIndex(contact => contact.id === id);
    if (index === -1) return null;
    contacts[index] = { ...contacts[index], ...updatedContact };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

module.exports = {
    listContacts,
    getById,
    addContact,
    removeContact,
    updateContact
};


