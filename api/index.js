const express = require('express');
const app = express();
var cors = require('cors');
var authRoute = require('./routes/auth');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: "http://localhost:5173",
}));

mongoose.connect(process.env.MONGO_URL).then(() => {
    console.log("Mongo connected :)");
}).catch(err => console.log(err.message));

// app.get('/test', (req, res) => {
//     res.json('test ok');
// });

// app.post('/register', (req, res) => {
//     const { name, email, password } = req.body;
//     res.json({ name, email, password });
// });

// Setting end points for api
app.use('/auth', authRoute);

app.listen(4000);