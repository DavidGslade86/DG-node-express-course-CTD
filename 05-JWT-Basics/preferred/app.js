require('dotenv').config();
require('express-async-errors');
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require('path');

const express = require('express');
const app = express();

const mainRouter = require('./routes/main-router');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.static(path.join(__dirname, './public/sample-login/dist')))
app.use(express.json());
app.use(cookieParser());
app.use(cors()); 

app.use('/api/v1', mainRouter)
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
    try{
        app.listen(port, () => console.log( `server is listening on port ${port}...`));
    } catch (error){
        console.log(error);
    }}

start();

