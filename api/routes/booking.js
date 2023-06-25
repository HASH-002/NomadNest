const BookingModel = require('../models/Booking');
const express = require('express');

var router = express.Router();

router.post('/add-user-booking', async (req, res) => {
    const { place, checkIn, checkOut, name, phone, price } = req.body;

    BookingModel.create({
        place, checkIn, checkOut, name, phone, price,
        // user: userData.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });

});

module.exports = router;