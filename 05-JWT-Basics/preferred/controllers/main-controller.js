const jwt = require('jsonwebtoken')
const {BadRequestError, UnauthenticatedError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const login = async (req, res) => {
    try{
        const {username, password} = req.body;

        if(!username || !password) {
            throw new BadRequestError('Please provide email and Password');
        }
    
        //just for demo
        const id = new Date().getDate()
    
        const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});
        const cookiesOptions = {
            maxAge: 24 * 60 * 60 * 1000,
            httpOnly: true,
          };
          res.cookie("token", token, cookiesOptions);
    
        res.status(StatusCodes.OK).json({
        success: true,
        message: "User Successfully Registered",
      });
    } catch (error) {
        throw new BadRequestError(error.message);
    }
}

const hello = async (req, res) => {
    try{
        res.status(StatusCodes.OK).json({
            success: true,
            message:`hello there ${req.user.username}!`,
        })
    } catch(error) {
        throw new UnauthenticatedError('You are not logged in');
    }
}

module.exports = {
    login,
    hello
}