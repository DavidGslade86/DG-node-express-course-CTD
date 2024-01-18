const {ServerErrors} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof ServerErrors) {
        return res.status(err.statusCode).json({
            success: false,
            message: err.message})
        }
    console.log(err)
    return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send.json({message: 'Hmmm, something went wrong. Try again later'})
}

module.exports = errorHandlerMiddleware