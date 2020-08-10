const express = require('express');
const router = express.Router();

const {
  getContacts,
  addContact,
  updateContact,
  deleteContact,
} = require('../controllers/contactControllers');

const { protect } = require('../middleware/authentication');

router.route('/').get(protect, getContacts).post(protect, addContact);

router.route('/:id').put(protect, updateContact).delete(protect, deleteContact);

module.exports = router;
