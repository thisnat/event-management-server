const mongoose = require('mongoose');
const express = require('express');

const router = express.Router();

const userSchema = require('../models/User');

router.route('/').get((req, res) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

module.exports = router;