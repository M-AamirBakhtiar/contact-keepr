const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a user name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Document Middleware to encrypt the user Password Before Saving it DataBase
UserSchema.pre('save', async function (next) {
  // Only Run the Encryption for Password Creating or Saving
  if (!this.isModified('password')) {
    return next();
  }

  // Hash the password field with a Salt of 12
  this.password = await bcrypt.hash(this.password, 12);

  // Preventing passwordConfirm from being save in DataBase
  this.passwordConfirm = undefined;

  next();
});

// Instance Method to Create JWT on the Current User
UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.SUPER_SECRET, {
    expiresIn: process.env.SUPER_EXPIRES_IN,
  });
};

//Instance Method to Check the User Entered Password with the Password in DataBase
UserSchema.methods.matchPassword = async function (userEnteredPassword) {
  // Return True if the passwords match
  return await bcrypt.compare(userEnteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
