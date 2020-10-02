const jwt = require('jsonwebtoken');

var verifyUser = (req, res, next) => {
    // console.log(req.headers.authorization);
    // console.log(req['headers'].authorization,'type-2');
    if (!req.headers.authorization) {
        return res.status(401).send({ message: 'Unauthorized Request' })
    }
    let token = req.headers.authorization.split(' ')[1]
    // console.log(token);
    if (token === null | token === undefined) {
        return res.status(401).send({ message: 'Unauthorized Request no token or invalid token' })
    }
    let payload = jwt.verify(token, 'signed')
    if (!payload) {
        return res.status(401).send({ message: 'Unauthorized Request invalid token or token expired' })
    }
    else {
        // req.body = payload.subject;
        next();
    }
}

//export module 
module.exports = verifyUser;