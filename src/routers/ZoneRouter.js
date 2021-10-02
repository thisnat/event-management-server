const express = require('express');

const router = express.Router();
const ZoneSchema = require('../models/Zone');

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

module.exports = router;