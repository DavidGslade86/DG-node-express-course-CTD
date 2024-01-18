const ServerErrors = require('./error');
const {StatusCodes} = require('http-status-codes');

class BadRequestError extends ServerErrors {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.BAD_REQUEST;
    }
  }
  
  module.exports = BadRequestError