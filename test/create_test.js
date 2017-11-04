const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectID;
const assert = require('assert');
const User = require('../db/models/User');
const Pin = require('../db/models/Pin');
const validator = require('validator');

describe('create test', () => {
  var tim, jim, jack, pin1, pin2, pin3, pin4, pin5;

  beforeEach(done => {
    tim = new User({
      email: 'tim@example.com',
      password: 'tim123'
    });

    jim = new User({
      email: 'jim@example.com',
      password: 'tim123'
    });

    jack = new User({
      email: 'jack@example.com',
      password: 'tim123'
    });

    pin1 = new Pin({
      title: 'pin1',
      link: 'somelink'
    });

    pin2 = new Pin({
      title: 'pin2',
      link: 'somelink'
    });

    pin3 = new Pin({
      title: 'pin3',
      link: 'somelink'
    });

    pin4 = new Pin({
      title: 'pin4',
      link: 'somelink'
    });

    pin5 = new Pin({
      title: 'pin5',
      link: 'somelink'
    });

    Promise.all([
      tim.save(),
      pin1.save(),
      pin2.save(),
      pin3.save(),
      pin4.save(),
      pin5.save()
    ])
      .then(docs => {
        //console.log(docs);
        done();
      })
      .catch(err => done(err));
  });
  it('should save user pin', done => {
    User.findById(tim._id)
      .populate('pins')
      .then(user => {
        user.myPins.push(pin1);
        user
          .save()
          .then(user => {
            //console.log(user);
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('should add multiple pins', done => {
    User.findById(ObjectId(tim._id))
      .populate('pins')
      .then(user => {
        user.myPins.push(pin2);
        user
          .save()
          .then(user => {
            //console.log(user);
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('should delete a pin', done => {
    User.findById(tim._id)
      .populate('pins')
      .then(user => {
        let arr = [pin1, pin2, pin3, pin4];
        user.myPins = arr;
        user
          .save()
          .then(user => {
            user.myPins = user.myPins.filter(val => {
              return ObjectId(val._id) !== ObjectId(pin3._id);
            });

            user
              .save()
              .then(user => {
                //console.log(user);
                done();
              })
              .catch(err => done(err));
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });

  it('should add likes', done => {
    Pin.findById(ObjectId(pin3._id)).then(pin => {
      pin.likes.push(ObjectId(jim._id));
      pin
        .save()
        .then(pin => {
          //console.log(pin);
          done();
        })
        .catch(err => done(err));
    });
  });

  it('should delete likes', done => {
    Pin.findById(ObjectId(pin4._id))
      .then(pin => {
        pin.likes = [...pin.likes, ObjectId(jim._id)];
        pin
          .save()
          .then(pin => {
            console.log(pin.likes.length);
            //done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));

    Pin.findById(ObjectId(pin4._id))
      .then(pin => {
        pin.update({ $pull: { likes: ObjectId(jim._id) } });
        pin
          .save()
          .then(pin => {
            console.log(pin.likes.length);
            done();
          })
          .catch(err => done(err));
      })
      .catch(err => done(err));
  });
});
