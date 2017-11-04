const User = require('../db/models/User');
const Pin = require('../db/models/Pin');
const verifyAuth = require('../controllers/verifyAuth');
const ObjectId = require('mongodb').ObjectID;

module.exports = app => {
  app.get('/api/allpins', (req, res) => {
    Pin.find({})
      .populate('likes')
      .then(pins => {
        res.status(200).send(pins);
      })
      .catch(err => err);
  });

  app.get('/api/mypins', verifyAuth, (req, res) => {
    let { userId } = req;

    User.findById(userId)
      .populate('pins')
      .then(user => {
        res.status(200).send(user.pins);
      })
      .catch(err => err);
  });

  app.post('/api/addpin', verifyAuth, (req, res) => {
    let { title, link, image } = req.body;
    let id = req.userId;

    let newPin = new Pin({
      title,
      link,
      image
    });

    User.findById(id).then(user => {
      user.pins.push(newPin);
      Promise.all([user.save(), newPin.save()])
        .then(async docs => {
          const reply = await Pin.find({}).populate('likes');
          res.status(200).send(reply);
        })
        .catch(err => err);
    });
  });

  app.post('/api/editpin/:id', verifyAuth, (req, res) => {
    let { userId } = req;
    let pinId = req.params.id;
    let { title, link, image } = req.body;

    Pin.findByIdAndUpdate(ObjectId(pinId), { title, link, image })
      .populate({
        path: 'users',
        match: userId
      })
      .then(async pin => {
        try {
          var updatePin = await pin.save();
        } catch (err) {
          console.log(err);
        }
        res.status(200).send({ updatePin });
      })
      .catch(err => err);
  });

  app.get('/api/deletepin/:id', verifyAuth, (req, res) => {
    let { userId } = req;
    let pinId = req.params.id;

    Pin.findByIdAndRemove(ObjectId(pinId))
      .then(doc => {
        console.log(doc);
        res.status(200).send(doc);
      })
      .catch(err => err);
  });

  app.get('/api/pin/likes/:id', verifyAuth, (req, res) => {
    let { id } = req.params;
    let { userId } = req;

    Pin.findById(ObjectId(id))
      .populate('likes')
      .then(pin => {
        let likeUser = pin.likes.find(val => {
          return val._id.toString() === userId.toString();
        });

        if (likeUser) {
          let newLikes = pin.likes.filter(val => {
            return val._id.toString() !== userId.toString();
          });
          pin.likes = newLikes;
          return pin.save();
        } else {
          pin.likes.push(userId);
          return pin.save();
        }
      })
      .then(pin => {
        res.status(200).send(pin);
      })
      .catch(err => err);
  });
};
