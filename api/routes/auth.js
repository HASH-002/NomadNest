const express = require('express');
const UserModel = require('../models/User');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = 'ninwnjoawndinidnwind';


const bcryptSalt = bcrypt.genSaltSync(10);

var router = express.Router();

router.get('/test', (req, res) => {
    res.json('test ok');
});

router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = await UserModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, bcryptSalt)
        });
        res.json(user);
    } catch (error) {
        res.status(422).json(error);
    }

});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (user) {
        const isPasswordCorrect = bcrypt.compareSync(password, user.password);

        if (isPasswordCorrect) {
            jwt.sign({ email: user.email, id: user._id }, jwtSecret, {}, (err, token) => {
                if (err) throw err;
                res.cookie('token', token).json(user);
            });

        } else {
            res.status(422).json('pass not ok');
        }
    }
    else res.status(404).json('not found');
});

router.get('/profile', (req, res) => {
    const { token } = req.cookies;
    if (token) {
        jwt.verify(token, jwtSecret, {}, async (err, user) => {
            if (err) throw err;
            const { name, email, _id } = await UserModel.findById(user.id);
            res.json({ name, email, _id });
        });
    } else {
        res.json(null);
    }
});

router.post('/logout', (req, res) => {
    res.cookie('token', "").json(true);
});

module.exports = router;