var authRoute = require('./routes/auth');
var uploadRoute = require('./routes/upload');
var placeRoute = require('./routes/place');

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongo connected :)");
}).catch(err => console.log(err.message));


// Setting end points for api
app.use('/auth', authRoute);
app.use('/upload', uploadRoute);
app.use('/place', placeRoute);

app.listen(4000);