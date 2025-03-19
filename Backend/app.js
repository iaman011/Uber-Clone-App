const dotenv = require('dotenv');
dotenv.config();
const cors = require('cors');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');  //cookie-parser is a middleware in Express.js used to parse cookies from incoming HTTP requests.
const connectToDb = require('./db/db');
connectToDb();
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
// const mapsRoutes = require('./routes/maps.routes');
// const rideRoutes = require('./routes/ride.routes');

connectToDb();

app.use(cors());                                   // Enables Cross-Origin Resource Sharing (CORS) for handling requests from different origins.
app.use(express.json());                           // Parses incoming JSON payloads and makes them accessible in req.body.
app.use(express.urlencoded({ extended: true }));   // Parses URL-encoded form data, allowing nested objects.
app.use(cookieParser());                           // Parses cookies from incoming requests and makes them available via req.cookies.



app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
// app.use('/maps', mapsRoutes);
// app.use('/rides', rideRoutes);




module.exports = app;
