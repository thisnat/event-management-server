const express = require('express');

const router = express.Router();
const userSchema = require('../models/User');

const bcrypt = require('bcrypt');

router.route('/').get((req, res, next) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

router.route('/register').post(async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    } catch {
        return res.status(500).send();
    }

    userSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

module.exports = router;