const PlaceModel = require('../models/Place');
const { verifyAccessToken } = require('../middleware/verify_token');

const express = require('express');
var router = express.Router();

router.post('/addPlace', verifyAccessToken, async (req, res) => {
    const {
        title, address, addedPhotos, description, perks,
        extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;

    const place = await PlaceModel.create({
        owner: req.payload.id, title, address, photos: addedPhotos, description,
        perks, extraInfo, checkIn, checkOut, maxGuests, price
    });
    res.json(place);
});

router.put('/updatePlace', verifyAccessToken, async (req, res) => {
    const {
        id, title, address, addedPhotos, description, perks,
        extraInfo, checkIn, checkOut, maxGuests, price
    } = req.body;

    const placeData = await PlaceModel.findById(id);
    if (req.payload.id === placeData.owner.toString()) {
        placeData.set({
            title, address, photos: addedPhotos, description, perks,
            extraInfo, checkIn, checkOut, maxGuests, price
        });
        await placeData.save();
        res.json('ok');
    }
});

router.get('/get-all-places', async (req, res) => {
    res.json(await PlaceModel.find());
});

router.get('/get-user-places', verifyAccessToken, async (req, res) => {
    res.json(await PlaceModel.find({ owner: req.payload.id }));
});

// put this route at last to get away from the error
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    res.json(await PlaceModel.findById(id));
});

module.exports = router;