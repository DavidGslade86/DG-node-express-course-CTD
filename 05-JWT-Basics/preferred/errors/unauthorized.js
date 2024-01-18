const ServerErrors = require('./error')
const {StatusCodes} = require('http-status-codes');

class UnauthenticatedError extends ServerErrors {
    constructor(message) {
      super(message)
      this.statusCode = StatusCodes.UNAUTHORIZED;
    }
  }
  
  module.exports = UnauthenticatedError