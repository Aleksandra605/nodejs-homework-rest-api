const getAllContacts = require('./getAllContacts');
const getContactById = require('./getContactById');
const addContact = require('./addContact');
const deleteContact = require('./deleteContact');
const updateContact = require('./updateContact');
const updateFavorite = require('./updateFavorite');
const register = require('./auth/register');

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
  register,
};
