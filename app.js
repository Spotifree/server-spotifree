const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser')
const logger = require('morgan');
const path = require('path');
const cors = require('cors')
require('dotenv').config()

const index = require('./routes/index');
const upload = require('./routes/upload');
const users = require('./routes/users')

const mongoose = require('mongoose').connect('mongodb://vinnixdb:ShadowFax5@cluster0-shard-00-00-b8rmh.mongodb.net:27017,cluster0-shard-00-01-b8rmh.mongodb.net:27017,cluster0-shard-00-02-b8rmh.mongodb.net:27017/spotifree?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', { useMongoClient: true });

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route
app.use('/api', index);
app.use('/upload', upload);
app.use('/users', users)

app.listen(process.env.PORT || '3000',(err) => {
  if(!err){
    console.log('Jalan di port 3000 or REAL server');
  } else {
    console.log(err);
  }
})