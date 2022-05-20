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
  console.log('Added new contact:', newContact);
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex(contact => contact.id === contactId);

  const deletedContact = contacts[index];
  if (index !== -1) {
    contacts.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
  }
  return deletedContact ? deletedContact : null;
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
