const express = require('express');
const router = express.Router();

const joinSchema = require('../models/Join');
const eventSchema = require('../models/Event');

const auth = require('../middleware/auth');

router.post('/:id', auth, (req, res, next) => {
    let joinData = {
        eventId: req.params.id,
        eventName: req.body.eventName,
        userId: req.jwt.userId,
        username: req.jwt.username,
        email : req.jwt.email,
        name : req.jwt.name,
        lastName : req.jwt.lastName
    }
    
    joinSchema.create(joinData, async (error, data) => {
        if (error) {
            return next(error);
        } else {
            await eventSchema.findByIdAndUpdate(req.params.id, { $inc: { join: 1 } })
            res.json(data);
        }
    })
});

router.get('/user/', auth, (req, res, next) => {
    joinSchema.find({ username: req.jwt.username }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

router.get('/isJoin/:id', auth, (req, res, next) => {
    joinSchema.findOne({ username: req.jwt.username, eventId: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

router.get('/event/:id', (req, res, next) => {
    joinSchema.find({ eventId: req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    }) 
})

module.exports = router;