const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../db/models/User');
const Pin = require('../db/models/Pin');

module.exports = app => {
  app.post('/api/signup', async (req, res) => {
    let { email, password } = req.body;

    let result = await User.findOne({ email }).populate('pins');
    if (result) return res.send('User already exists');

    let hashPass = bcrypt.hashSync(password, 7);
    let newUser = new User({
      email,
      password: hashPass
    });

    newUser
      .save()
      .then(user => {
        let token = jwt.sign({ id: user._id }, 'secret', {
          expiresIn: '2d'
        });
        res.status(200).send({ user, token });
      })
      .catch(err => res.status(501).send(err));
  });

  app.post('/api/login', (req, res) => {
    let { email, password } = req.body;

    User.findOne({ email }).populate('pins').then(user => {
      if (!user) return res.status(404).send('User not found');

      let check = bcrypt.compareSync(password, user.password);
      //console.log(check);
      if (!check) return res.status(403).send('Invalid credentials');
      if (check) {
        let token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '2d' });
        res.status(200).send({ user, token });
      }
    });
  });
};
