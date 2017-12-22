const express = require('express');
const app = require('express')();
const bodyParser = require('body-parser')
const logger = require('morgan');
const index = require('./routes/index');
const upload = require('./routes/upload');
const path = require('path');
const cors = require('cors')

app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//route
app.use('/api', index);
app.use('/upload', upload);

app.listen(process.env.PORT || '3000',(err) => {
  if(!err){
    console.log('Jalan di port 3000 or REAL server');
  } else {
    console.log(err);
  }
})