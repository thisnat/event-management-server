const express = require('express');

const router = express.Router();
const userSchema = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.route('/').get((req, res, next) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

router.route('/id/:id').get((req, res, next) => {
    userSchema.findOne({ 'username': req.params.id }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

router.route('/login').post((req, res, next) => {
    let { username, password } = req.body;

    userSchema.findOne({ 'username': username }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            if (data === null) {
                res.status(404).json({ msg: "user not found" });
            } else {
                bcrypt.compare(password, data.password).then(isMatch => {
                    if (isMatch) {
                        //create userdata (jwt sign)
                        let userData = {
                            userId : data._id,
                            username : data.username,
                            isOrg : data.isOrg,
                            status : data.status,
                            role : data.role
                        }
                        const token = jwt.sign(userData, process.env.JWT_SECRET);

                        //data for front-end (non sensitive)
                        let clientData = {
                            username : data.username,
                            name : data.name,
                            lastName : data.lastName,
                            email : data.email,
                            pic : data.pic,
                            token : token
                        }

                        res.status(200).send(clientData);
                    } else {
                        res.status(401).json({msg : "unauthorized"});
                    }
                })
                .catch(err => {
                    res.status(500).json({msg : err});
                });
            }
        }
    });

});

router.route('/register').post(async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        req.body.password = hashedPassword;
    } catch {
        return res.status(500).send();
    }

    userSchema.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

module.exports = router;