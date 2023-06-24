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

router.put('/updatePlace', async (req, res) => {
    const { token } = req.cookies;

    const {
        id, title, address, addedPhotos, description, perks,
        extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;

    jwt.verify(token, jwtSecret, {}, async (err, user) => {

        const placeData = await PlaceModel.findById(id);

        if (err) throw err;
        if (user.id === placeData.owner.toString()) {
            placeData.set({
                title, address, photos: addedPhotos, description, perks,
                extraInfo, checkIn, checkOut, maxGuests, price
            });
            await placeData.save();
            res.json('ok');
        }
    });
});

router.get('/getAllPlaces', (req, res) => {
    const { token } = req.cookies;
    jwt.verify(token, jwtSecret, {}, async (err, user) => {
        const { id } = user;
        res.json(await PlaceModel.find({ owner: id }));
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await PlaceModel.findById(id));
});

module.exports = router;