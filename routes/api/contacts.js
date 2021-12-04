const express = require('express');
const router = express.Router();
const {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateContact,
  updateFavorite,
} = require('../../controllers/index');
const validation = require('../../middlewares/validation');
const authenticate = require('../../middlewares/authenticate');

const { contactJoi } = require('../../model/contact');

router.get('/', authenticate, getAllContacts);

router.get('/:contactId', authenticate, getContactById);

router.post('/', authenticate, validation(contactJoi), addContact);

router.delete('/:contactId', authenticate, deleteContact);

router.put('/:contactId', authenticate, validation(contactJoi), updateContact);

router.patch('/:contactId/favorite', authenticate, updateFavorite);

module.exports = router;
