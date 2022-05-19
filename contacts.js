const fs = require('fs/promises');
const path = require('path');
const contactsPath = path.join(__dirname, '/db/contacts.json');
const uuid = require('uuid');

async function listContacts() {
  const dataString = await fs.readFile(contactsPath, 'utf-8');
  const data = JSON.parse(dataString);
  return data;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  return contact ? contact : null;
}

async function addContact(name, email, phone) {
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };
  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(({ id }) => id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts));
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
