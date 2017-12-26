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