const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.sendStatus(403)
    } else {
        //"result" in callback return sign value
        //in sign method, username is signed so "result" value = username
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) return res.sendStatus(403);

            req.body.userdata = result;
            next();
        })
    }
}

module.exports = authenticateToken;