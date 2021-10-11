const express = require('express');
const router = express.Router();

const multer = require('multer');
const auth = require('../middleware/auth');

const PaymentSchema = require('../models/Payment');
const ReserveSchema = require('../models/Reserve');
const EventSchema = require('../models/Event');
const ZoneSchema = require('../models/Zone');
const userSchema = require('../models/User');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public');
    },
    filename: function (req, file, cb) {
        let [type, extension] = file.mimetype.split("/");

        cb(null, `${type}${Date.now()}.${extension}`);
    }
})

const upload = multer({
    storage: storage
})

//for testing
router.post('/', upload.single('content'), (req, res) => {
    console.log(req.file);
    console.log(req.body.data);

    res.send({ msg: 'upload done' });
});

router.post('/payment', upload.single('content'), (req, res, next) => {
    PaymentSchema.findByIdAndUpdate(req.body.data, {status : 1, pic : req.file.filename}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.send(data)
        }
    })
});

function createZoneArray (max, zone) {
    let array = []
    for (let index = 0; index < max; index++) {
        array.push(Object.assign({}, zone, {name : index + 1}))
    }

    return array
}

router.post('/reserve', [auth, upload.single('content')], (req, res, next) => {
    let requestData = JSON.parse(req.body.data);

    ReserveSchema.create(Object.assign({}, requestData , {host : req.jwt.username, pic : req.file.filename}), async (error, data) => {
        if (error) {
            return next(error);
        } else {
            let zone = {
                eventName : requestData.eventName,
                eventId : data.eventId,
                price : requestData.price,
                reserveId : data.id,
            }
            await EventSchema.findByIdAndUpdate(data.eventId, {maxReserve : requestData.maxReserve});
            await ZoneSchema.create(createZoneArray(requestData.maxReserve, zone));
            res.json(data);
        }
    })
});

router.post('/profile', [auth, upload.single('content')], (req, res, next) => {
    userSchema.findOneAndUpdate({username : req.jwt.username}, {pic : `${req.body.data}${req.file.filename}`, update_at : Date.now()}, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
});


module.exports = router;