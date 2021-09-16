const jwt = require('jsonwebtoken');


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
        return res.status(403).json({msg : "token not found"})
    } else {
        jwt.verify(token, process.env.JWT_SECRET, (err, result) => {
            if (err) return res.status(403).json({msg : "invalid token"});

            req.jwt = result;
            next();
        })
    }
}

module.exports = authenticateToken;