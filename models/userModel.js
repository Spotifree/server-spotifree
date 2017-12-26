const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  username: String,
  password: String,
  first_name: String,
  last_name: String,
  email: String,
  facebook_id: String,
  google_id: String,
  playlist: [{ type: Schema.Types.ObjectId, ref: 'Playlist' }]
})

module.exports = mongoose.model('User', userSchema);