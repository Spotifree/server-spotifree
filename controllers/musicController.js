// const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/Musics?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
// const mongoose = require('mongoose').connect('mongodb://localhost:27017/Musics');
const Music = require('../models/musicModel');
const musicHelper = require('../helpers/upload')
const upload = musicHelper.multer.fields([{ name: 'image', maxCount: 1 }, { name: 'music', maxCount: 1 }])

module.exports = {
  getAll (req, res) {
    Music.find()
    .then(musics => {
      res.send(musics)
    })
    .catch( err => {
      res.send(err)
    })
  },

  upload (req, res, next) {
    console.log('Upload')
    upload(req, res, function (err) {
      if (err) {
        return res.status(400).json({
          error: 'err'
        });
        console.log(err)
      }
      next();
    });
  },

  create (req, res, next) {
    let musicData = {
      title: req.body.title,
      genre: req.body.genre,
      artist: req.body.artist,
      urlMusic: req.files.music[0].cloudStoragePublicUrl,
      urlThumbnail: req.files.image[0].cloudStoragePublicUrl
    }
    Music.create(musicData)
    .then(music => {
      res.send(music)
    })
    .catch(err => {
      res.status(500).send(err)
    })
  },

  remove (req, res) {
    Music.findByIdAndRemove(req.params.id)
    .then(user => {
      res.send({
        status: 'music deleted.',
        data: user
      })
    })
    .catch(err => {
      res.status(500).send(err)
    })
  }
} 