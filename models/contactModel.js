const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'A Contact must belong to a User.'],
  },
  name: {
    type: String,
    required: [true, 'A Contact must have a name.'],
  },
  email: {
    type: String,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: String,
  type: {
    type: String,
    enum: ['personal', 'professional'],
    default: 'personal',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contact', ContactSchema);
