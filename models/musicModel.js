var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var musicSchema = new Schema({
  title: String,
  genre: String,
  artist: String,
  urlMusic: String,
  urlThumbnail: String,
});

module.exports = mongoose.model('Music', musicSchema);