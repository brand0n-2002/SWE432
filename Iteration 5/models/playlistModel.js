const mongoose = require('mongoose');

const playlistSchema = new mongoose.Schema({
  name: String,
  dj_name: String,
  playlist_image: String,
  songs: [
    {
      song_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Song' },
      artist_image: String,
      audio_file: String,
      song_name: String,
    },
  ],
});

const Playlist = mongoose.model('Playlist', playlistSchema,'playlist');

module.exports = Playlist;
