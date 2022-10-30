const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Song = db.model('Song', {
  artist: String,
  title: String,
  duration: Number,
  _ownerplaylist: {
    type: Schema.Types.ObjectId,
    ref: 'Playlist'
  }
});

module.exports = Song;