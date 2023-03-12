const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the user schema
const userSchema = new Schema({
  userName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
