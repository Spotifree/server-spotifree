// const mongoose = require('mongoose').connect('mongodb://vbagustinus:anakjalanan@smartshop-shard-00-00-hibsb.mongodb.net:27017,smartshop-shard-00-01-hibsb.mongodb.net:27017,smartshop-shard-00-02-hibsb.mongodb.net:27017/Musics?ssl=true&replicaSet=smartshop-shard-0&authSource=admin');
// const mongoose = require('mongoose').connect('mongodb://localhost:27017/Musics');
const ObjectId = require('mongodb').ObjectID;
const Musics = require('../models/modelMusic');

let getAllMusics = (req, res) => {
  Musics.find()
  .then(datamusics => {
    console.log(datamusics);
    res.send(datamusics)
  })
  .catch( err => {
    console.log(err);
  })
  res.send('UPLOAD')
}

let createMusic = (req, res, next) => {
  console.log('GA KESINI', req.body)
  console.log('IMAGES',req.files.image[0])
  console.log('MUSIC', req.files.music[0])
  // console.log('LOKASI',req.body.longitude);
  // console.log('LOKASI',req.body.latitude);
  // console.log('URL PENTING',req.file.cloudStoragePublicUrl);
  // let inputObj = Musics({
  //   name: req.body.name,
  //   url: req.file.cloudStoragePublicUrl,
  //   longitude: req.body.longitude,
  //   latitude: req.body.latitude,
  // })
  //  inputObj.save()
  //  .then( data => {
  //    res.send({
  //      msg: 'Data Tersimpan',
  //      data: data
  //    })
  //  })
  //  .catch( err=> {
  //    console.log(err);
  //  })
}

// let deletemusics = (req, res) => {
//   // console.log("ID",req.params.id);
//   let id = {
//     _id : ObjectId(req.params.id)
//   }
//   Musics.findByIdAndRemove(id)
//   .then(musicssRemove => {
//     res.send({
//       music: musicssRemove,
//       messages: 'Remove successed'
//     })
//   })
//   .catch(err=>{
//     res.status(500).send(err)
//   })
// }

// let updatemusics = (req, res) => {

// }

module.exports = {
  createMusic,
  getAllMusics,
  // deletemusics,
  // updatemusics
}