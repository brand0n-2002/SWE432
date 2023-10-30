const express = require('express');
const app = express();
const port = 8080; // Change this to your desired port
const path = require('path');


// Set the view engine to EJS
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// Serve static files from the 'public' directory
//app.use(express.static('public'));

// Define your routes

// Home page (common_page)
app.get('/', (req, res) => {
    console.log('Producer 0.A route triggered');
    res.render('common_page', { pageTitle: 'Common Page' });
});

app.get('/common_page', (req, res) => {
    console.log('Producer 0.B route triggered');
    res.render('common_page', { pageTitle: 'Common Page' });
});

// Producer pages
app.get('/producer1', (req, res) => {
    console.log('Producer 1 route triggered');
    res.render('producer1', { pageTitle: 'Producer 1' });
});

app.get('/producer2', (req, res) => {
    console.log('Producer 2 route triggered');
    res.render('producer2', { pageTitle: 'Producer 2' });
});

app.get('/producer3', (req, res) => {
    console.log('Producer 3 route triggered');
    res.render('producer3', { pageTitle: 'Producer 3' });
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
