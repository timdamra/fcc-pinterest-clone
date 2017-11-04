const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://tim:hatim123@ds125335.mlab.com:25335/pinterest');

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB is Running!');
});

module.exports = mongoose;
