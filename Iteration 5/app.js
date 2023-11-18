const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 8080; // Change this to your desired port
const path = require('path');
const mongoose = require('mongoose');
const Playlist = require('./models/playlistModel');
const Song = require('./models/songModel');
const DJ=require('./models/djsModel');
const Schedule=require('./models/scheduleModel');
// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/swe432', { useNewUrlParser: true, useUnifiedTopology: true });


// Check for successful connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set the view engine to EJS
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Serve static files from the 'public' directory
//app.use(express.static('public'));

// Define your routes
// Example route to get all playlists


// Default route to render common_page.ejs on application start
app.get('/', async (req, res) => {
    console.log('Common Page route triggered');
    try {
      const playlists = await Playlist.find();
      const s = await Song.find();
      res.render('common_page', { pageTitle: 'Common Page', playlists });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  });

// Producer pages
app.get('/producer1', async(req, res) => {
    console.log('Producer 1 route triggered');
    try {
      const schedule = await Schedule.find();
      res.render('producer1', { pageTitle: 'Producer 1', schedule });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
});

app.post('/updateScheduleToDefault', async (req, res) => {
  const { queue } = req.body;
  console.log("Update Schedule to Default route triggered. Queue:", queue);
  try {
      const updatedSchedule = await Schedule.findOneAndUpdate(
          { queue: queue },
          {
              dj_name: "Open Slot",
              name: "Open Slot",
              playlist_image: "/images/station_placeholder.jpg"
          },
          { new: true }
      ).exec();

      if (!updatedSchedule) {
          return res.status(404).json({ error: 'Schedule not found' });
      }

      //return res.status(200).json({ message: 'Schedule updated to default', updatedSchedule });
      return res.status(200).json({ message: 'Schedule updated to default', updatedSchedule, reload: true });

      //return res.redirect('/');
  } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/producer2', async(req, res) => {
    console.log('Producer 2 route triggered');
    const queue = req.query.queue || 'Default Queue Number';

    console.log('Queue Number:', queue);
    try {
      const dj = await DJ.find();
      res.render('producer2', { pageTitle: 'Producer 2', dj,queue });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
});

app.get('/producer3', async(req, res) => {
  console.log('Producer 3 route triggered');
  const djName = req.query.djName || 'Default DJ Name';
  const queue = req.query.queue || 'Default Queue Number';
  console.log('DJ Name:', djName);
  console.log('Queue Number:', queue);

  try {
    const playlists = await Playlist.find();
    const s = await Song.find();

    res.render('producer3', { pageTitle: 'Producer 3', playlists, djName,queue });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.post('/updateSchedule', async (req, res) => {
  const { djName, queue, playlistName, playlistImage } = req.body;
  console.log('DJ Name:', djName);
  console.log('Queue Number:', queue);
  console.log('P Name:', playlistName);
  console.log('P image:', playlistImage);
  try {
    const updatedSchedule = await Schedule.findOneAndUpdate(
      { queue: queue },
      { dj_name: djName, name: playlistName, playlist_image: playlistImage },
      { new: true }
  ).exec();
  

    if (!updatedSchedule) {
        // Handle the case where the document with the given queue wasn't found
        return res.status(404).json({ error: 'Schedule not found' });
    }

    //return res.status(200).json({ message: 'Schedule updated successfully', updatedSchedule });
    return res.redirect('/');
} catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
}
});

app.get('/producer4', (req, res) => {
    console.log('Producer 4 route triggered');
    res.render('producer4', { pageTitle: 'Producer 4' });
});

app.get('/producer5', (req, res) => {
    console.log('Producer 5 route triggered');
    res.render('producer5', { pageTitle: 'Producer 5' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
