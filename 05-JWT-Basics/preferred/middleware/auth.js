const jwt = require('jsonwebtoken');
const {StatusCodes} = require('http-status-codes');
const {UnauthenticatedError} = require('../errors');

const authMiddleware = async (req, res, next) => {
    const {token} = req.cookies; 
    if (!token) {
        throw new UnauthenticatedError('No token provided' );
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const {id, username} = decoded;
        req.user = {id, username}
        next();
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = authMiddleware;
