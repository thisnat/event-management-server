const express = require('express');

const router = express.Router();
const userSchema = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

router.route('/').get((req, res, next) => {
    userSchema.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    });
});

router.get('/me', auth, (req, res, next) => {
    userSchema.findOne({ 'username': req.jwt.username }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            //create data for client
            let clientData = {
                create_at: data.create_at,
                update_at: data.update_at,
                _id: data._id,
                isOrg: data.isOrg,
                name: data.name,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                pic: data.pic,
            }
            res.json(clientData);
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
                            userId: data._id,
                            username: data.username,
                            isOrg: data.isOrg,
                            status: data.status,
                            role: data.role
                        }
                        const token = jwt.sign(userData, process.env.JWT_SECRET);

                        //data for front-end (non sensitive)
                        let clientData = {
                            username: data.username,
                            name: data.name,
                            lastName: data.lastName,
                            email: data.email,
                            pic: data.pic,
                            token: token
                        }

                        res.status(200).send(clientData);
                    } else {
                        res.status(401).json({ msg: "unauthorized" });
                    }
                })
                    .catch(err => {
                        res.status(500).json({ msg: err });
                    });
            }
        }
    });

});

router.route('/register').post((req, res, next) => {

    userSchema.findOne({ 'username': req.body.username }, async (error, data) => {
        if (error) {
            return next(error);
        } else {

            //check username is taken
            if (data === null) {
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
            } else {
                res.status(400).json({ msg : "invalid username" });
            }
        }

    });
})

module.exports = router;