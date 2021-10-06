const express = require('express');
const router = express.Router();
const PaymentSchema = require('../models/Payment');
const EventSchema = require('../models/Event');
const ZoneSchema = require('../models/Zone');
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

router.patch('/confirm/:id', auth, (req, res, next) => {
    PaymentSchema.findByIdAndUpdate(req.params.id, {status : 2, update_at : Date.now()}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send(data)
        }
    })
});

router.patch('/cancel/:id', auth, (req, res, next) => {
    PaymentSchema.findByIdAndUpdate(req.params.id, {status : 3}, async (error, data) => {
        if (error) {
            return next(error);
        } else {
            await EventSchema.findByIdAndUpdate(data.eventId, { $inc: { reserve: -1 } });
            await ZoneSchema.findByIdAndUpdate(data.zoneId, {owner : "", isReserve : false});
            res.send(data)
        }
    })
});


module.exports = router;