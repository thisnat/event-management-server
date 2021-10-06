const express = require('express');
const router = express.Router();

const ReserveSchema = require('../models/Reserve');
const EventSchema = require('../models/Event');

const ZoneSchema = require('../models/Zone');
const auth = require('../middleware/auth');

function createZoneArray (max, zone) {
    let array = []
    for (let index = 0; index < max; index++) {
        array.push(Object.assign({}, zone, {name : index + 1}))
    }

    return array
}

router.post('/create', auth, (req, res, next) => {
    ReserveSchema.create(Object.assign({}, req.body , {host : req.jwt.username}), async (error, data) => {
        if (error) {
            return next(error);
        } else {
            let zone = {
                eventName : req.body.eventName,
                eventId : data.eventId,
                price : req.body.price,
                reserveId : data.id
            }
            await EventSchema.findByIdAndUpdate(data.eventId, {maxReserve : req.body.maxReserve});
            await ZoneSchema.create(createZoneArray(req.body.maxReserve, zone));
            res.json(data);
        }
    })
})

router.get('/event/:id', (req, res, next) => {
    ReserveSchema.findOne({eventId : req.params.id}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

router.get('/:id', auth, (req, res, next) => {
    ReserveSchema.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

module.exports = router;