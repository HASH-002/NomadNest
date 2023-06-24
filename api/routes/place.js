const express = require('express');
const PlaceModel = require('../models/Place');

const jwt = require('jsonwebtoken');
const jwtSecret = 'ninwnjoawndinidnwind';

var router = express.Router();

router.post('/addPlace', async (req, res) => {

    const {
        title, address, addedPhotos, description, perks,
        extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;

    const { token } = req.cookies;

    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        if (err) throw err;
        const place = await PlaceModel.create({
            owner: user.id, title, address, photos: addedPhotos, description,
            perks, extraInfo, checkIn, checkOut, maxGuests, price
        });
        res.json(place);
    });
});

module.exports = router;