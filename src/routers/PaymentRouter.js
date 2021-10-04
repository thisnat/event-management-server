const express = require('express');
const router = express.Router();

const PaymentSchema = require('../models/Payment');

const auth = require('../middleware/auth');

router.get('/user', auth, (req, res, next) => {
    PaymentSchema.find({username : req.jwt.username}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send(data)
        }
    })
});

module.exports = router;