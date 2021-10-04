const express = require('express');
const router = express.Router();

const ZoneSchema = require('../models/Zone');
const EventSchema = require('../models/Event');
const PaymentSchema = require('../models/Payment');
const auth = require('../middleware/auth');

router.get('/zoneByEvent/:id', (req, res, next) => {
    ZoneSchema.find({ eventId: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send(data)
        }
    });
});

router.patch('/update/:id', auth, (req, res, next) => {
    ZoneSchema.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send(data)
        }
    })
});

router.patch('/reserve/:id', auth, (req, res, next) => {
    ZoneSchema.findByIdAndUpdate(req.params.id, {isReserve : true, owner : req.jwt.username}, async (error, data) => {
        if (error) {
            return next(error);
        } else {
            let payment = {
                zoneId : data._id,
                zoneName : data.name,
                zonePrice : data.price,
                eventName : req.body.eventName,
                eventId : req.body.eventId,
                reserveId : data.reserveId,
                username : req.jwt.username,
            }

            await EventSchema.findByIdAndUpdate(data.eventId, { $inc: { reserve: 1 } });
            await PaymentSchema.create(payment);
            
            res.send(data)
        }
    })
});

module.exports = router;