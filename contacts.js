const path = require("path");
const contactsPath = path.join(__dirname, "db/contacts.json");
const fs = require("fs").promises;
const {v4} = require("uuid");


const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const getContactById = async (contactId) => {
  try {
    const data = await listContacts();
    const oneContact = data.find((item) => item.id === contactId);
    return oneContact;
  } catch (error) {
    console.error(error);
  }
};

const removeContact = async (contactId) => {
  try {
    const data = await await listContacts();
    const contacts = data.filter((data) => data.id !== contactId);
    return contacts;
  } catch (error) {
    console.error(error);
  }
};

const addContact = async ( name, email, phone) => {
  try {
    const newContact = { id: v4(), name, email, phone };
    const contacts = await listContacts();
    contacts.push(newContact);
    await changeContacts(contacts);
    return newContact;
  } catch (error) {
    console.error(error);
  }
};

const changeContacts = async (newContacts) => {
  try {
     await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, ' '));
  } catch (error) {
    console.error(error);
  }
};


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};