const jwt = require('jsonwebtoken')
const {BadRequestError} = require('../errors');
const {StatusCodes} = require('http-status-codes');

const login = async (req, res) => {
    const {username, password} = req.body;

    if(!username || !password) {
        throw new BadRequestError('Please provide email and Password');
    }

    //just for demo
    const id = new Date().getDate()

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn:'30d'});

    res.status(StatusCodes.OK).json({msg:'user created', token});
}

const dashboard = async (req, res) => {
    const luckyNumber = Math.floor (Math.random()*100);

    res.status(200).json({
        msg:`hello there ${req.user.username}`,
        secret:`Here is your authorized data, your lucky number is ${luckyNumber}`
    })
}

module.exports = {
    login,
    dashboard
}
