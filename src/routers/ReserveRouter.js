const express = require('express');
const router = express.Router();

const ReserveSchema = require('../models/Reserve');
const EventSchema = require('../models/Event');

const auth = require('../middleware/auth');

router.post('/create', auth, (req, res, next) => {
    ReserveSchema.create(Object.assign({}, req.body , {host : req.jwt.username}), async (error, data) => {
        if (error) {
            return next(error);
        } else {
            await EventSchema.findByIdAndUpdate(data.eventId, {canReserve : true, maxReserve : req.body.maxReserve});
            res.json(data);
        }
    })
})

module.exports = router;