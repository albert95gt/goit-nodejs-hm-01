// const argv = require('yargs').argv;
const contactsOperations = require('./contacts');
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      const contacts = await contactsOperations.listContacts();
      console.log(contacts);
      break;

    case 'get':
      const contact = await contactsOperations.getContactById(id);

      if (!contact) {
        throw new Error(`Contact with id ${id} not found!`);
      }
      console.log(contact);
      break;

    case 'add':
      await contactsOperations.addContact(name, email, phone);
      break;

    case 'remove':
      await contactsOperations.removeContact(id);
      break;
    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

// invokeAction({ action: 'list' });
// invokeAction({ action: 'get', id: '2' });
// invokeAction({ action: 'remove', id: '2' });
