// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware */

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross-origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 3000;
const server = app.listen(port, listening);

// Callback to debug
function listening() {
    console.log(`Server running on localhost:${port}`);
}

// Initialize all route with a callback function
app.get('/all', sendData);

function sendData(req, res) {
    res.send(projectData);
}

// Post Route
app.post('/add', addData);

function addData(req, res) {
    projectData.date = req.body.date;
    projectData.temperature = req.body.temperature;
    projectData.userResponse = req.body.userResponse;
    res.send(projectData);
}
