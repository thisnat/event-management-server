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

router.post('/event/confirm', auth, (req, res, next) => {
    PaymentSchema.find({eventId : req.body.eventId, status : 1}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send(data)
        }
    })
});

router.post('/event/paid', auth, (req, res, next) => {
    PaymentSchema.find({eventId : req.body.eventId, status : 2}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send(data)
        }
    })
});

router.get('/:id', auth, (req, res, next) => {
    PaymentSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send(data)
        }
    })
});

module.exports = router;