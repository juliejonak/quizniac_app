const express = require('express');

// Adds cors and log middleware
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

// Sets up mongodb connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false // Allows use of findOneAndUpdate
  })
    .then( () => {
        console.log("Connected to database.")
    })
    .catch( (err) => {
        console.log(`Error connecting to db: ${err}`)
    })

// Imports card routes
const cardRouter = require('./routes/card_routes');

const server = express();

server.use(
    express.json(),
    logger('dev'),
    cors()
);

const PORT = process.env.PORT || 4300;

server.use('/cards', cardRouter);


server.listen( PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});