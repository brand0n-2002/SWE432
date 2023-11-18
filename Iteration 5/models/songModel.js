const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  name: String,
  artist: String,
  artist_image: String,
  audio_file: String,
  playlists: [
    {
      playlist_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Playlist' },
      playlist_name: String,
    },
  ],
});

const Song = mongoose.model('Song', songSchema,'songs');

module.exports = Song;
