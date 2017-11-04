const mongoose = require('mongoose');
const Pin = require('./Pin');
const validator = require('validator');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true
  },
  password: {
    type: String,
    require: true,
    minlength: 5
  },
  pins: [{ type: Schema.Types.ObjectId, ref: 'pin' }]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
