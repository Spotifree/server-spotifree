const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
  getAll (req, res) {
    User.find()
    .then(users => {
      res.send(users)
    })
    .catch(err => {
      res.send(err)
    })
  },
  login (req, res) {
    User.findOne({username: req.body.username})
    .then(user => {
      bcrypt.compare(req.body.password, user.password)
      .then(response => {
        let dataUser = {
          id: user._id,
          username: user.username,
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email
        }
        jwt.sign(dataUser, process.env.SECRET_JWT, function(err, token) {
          if(!err) {
            res.send({
              token: token
            })
          }
        });
      });
    })
    .catch(err => {
      res.send({
        status: 'incorrect username/password',
        err: err
      })
    })
  },
  signup (req, res) {
    bcrypt.hash(req.body.password, 10)
    .then(function(hash) {
      req.body.password = hash
      User.create(req.body)
      .then(user => {
        res.send(user)
      })
      .catch(err => {
        res.send(err)
      })
    });
  },
  update (req, res) {

  },
  remove (req, res) {

  }
}