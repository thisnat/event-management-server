const express = require('express');

const router = express.Router();
const eventSchema = require('../models/Event');

const userSchema = require('../models/User');

const auth = require('../middleware/auth');

router.get('/', (req, res, next) => {
    eventSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

router.get('/id/:id', (req, res) => {
    eventSchema.findById(req.params.id, async (error, data) => {
        if (error) {
            return res.status(500).json({msg : "not found"});
        } else {

            const host = await userSchema.findOne({ 'username': data.host });

            const hostClean = {
                name : host.name,
                lastName : host.lastName,
                username : host.username,
                about : host.about,
                pic : host.pic,
                isOrg : host.isOrg
            }

            res.json(Object.assign({}, data._doc, { hostData : hostClean }));
        }
    })
});

router.post('/create', auth, (req, res, next) => {
    eventSchema.create(Object.assign({}, req.body, { host: req.jwt.username }), (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

router.get('/host/', auth, (req, res, next) => {
    eventSchema.find({ host: req.jwt.username }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});

module.exports = router;