const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoDB is Running!');
});

module.exports = mongoose;
