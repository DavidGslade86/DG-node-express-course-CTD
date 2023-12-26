const connectDB = require('./db/connect');
const express = require('express');
require('dotenv').config()
const app = express();
const tasks = require('./routes/tasks');
const notFound = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
mongUri = process.env.BASE_URI

//middleware
app.use(express.static('./public'))
app.use(express.json());

//routes

app.use('/api/v1/tasks', tasks);
app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8000;

const start = async () => {
    try {
        await connectDB(mongUri)
        app.listen(port, console.log(`server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();

