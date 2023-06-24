const express = require('express');
const download = require('image-downloader');
const path = require('path');
const multer = require('multer');
const fs = require('fs');

var router = express.Router();

const savingDirectory = path.join(__dirname, '..', 'uploads');

router.post('/with-link', async (req, res) => {

    const { link } = req.body;
    var newName = 'photo' + Date.now() + '.jpg';
    await download.image({
        url: link,
        dest: savingDirectory + '/' + newName,
    });
    res.json(newName);
});

const photosMiddleware = multer({ dest: 'uploads/' });
router.post('/without-link', photosMiddleware.array('photos', 100), (req, res) => {

    let uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i];
        const parts = originalname.split('.');
        const ext = parts[parts.length - 1];
        const newPath = path + '.' + ext;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
    // console.log(req.files);
});


module.exports = router;