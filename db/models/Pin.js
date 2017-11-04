const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const PinSchema = new Schema({
  title: String,
  link: String,
  image: String,
  likes: [{ type: Schema.Types.ObjectId, ref: 'user' }],
  _creator: { type: Schema.Types.ObjectId, ref: 'user' }
});

const Pin = mongoose.model('pin', PinSchema);

module.exports = Pin;
