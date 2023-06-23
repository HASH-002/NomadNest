const express = require('express');
const download = require('image-downloader');
const path = require('path');

var router = express.Router();

const savingDirectory = path.join(__dirname, '..', 'uploads');

// router.get('/test', (req, res) => {
//     res.json({ savingDirectory, dir: __dirname });
// });

router.post('/with-link', async (req, res) => {

    const { link } = req.body;
    var newName = 'photo' + Date.now() + '.jpg';
    await download.image({
        url: link,
        dest: savingDirectory + '/' + newName,
    });
    res.json(newName);
});

module.exports = router;