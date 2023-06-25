const BookingModel = require('../models/Booking');
const { verifyAccessToken } = require('../middleware/verify_token');

const express = require('express');
var router = express.Router();

router.post('/add-user-booking', verifyAccessToken, (req, res) => {
    const { place, checkIn, checkOut, name, phone, price } = req.body;
    BookingModel.create({
        place, checkIn, checkOut, name, phone, price,
        user: req.payload.id,
    }).then((doc) => {
        res.json(doc);
    }).catch((err) => {
        throw err;
    });
});

router.get('/get-user-bookings', verifyAccessToken, async (req, res) => {
    res.json(await BookingModel.find({ user: req.payload.id }).populate('place'));
});

module.exports = router;