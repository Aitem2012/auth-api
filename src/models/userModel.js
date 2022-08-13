const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  firstName: {
    type: 'string',
    required: true,
  },
  lastName: {
    type: 'string',
    required: true,
  },
  email: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model('users', UserSchema);
