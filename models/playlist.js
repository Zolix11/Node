const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Playlist = db.model('Playlist', {
  name: String,
  songs: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  description: String,
 
  _owneruser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = Playlist;