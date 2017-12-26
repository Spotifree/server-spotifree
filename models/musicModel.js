var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var musicSchema = new Schema({
  title:  String,
  urlMusic: String,
  genre: String,
  urlThumbnail: String,
  artist: String

});

module.exports = mongoose.model('Music', musicSchema);