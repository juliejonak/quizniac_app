const express = require('express');

// Adds cors and log middleware
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

// Sets up mongodb connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, err => {
    if (err) throw err;
    console.log('Db open.')
});
const card = require('./models/card');

const server = express();

server.use(
    express.json(),
    logger('dev'),
    cors()
);

const PORT = process.env.PORT || 4300;

const getCards = async () => {
    const cards = await card.find({});
    return cards;
}

server.get('/api/cards', (req, res) => {
    getCards()
        .then( cards => {
            res.json(cards)
        })
        .catch( err => {
            res.status(500).json({ message: `Could not fetch cards: ${err}`})
        })
})

server.listen( PORT, (err) => {
    if (err) throw err;
    console.log(`Server is listening on ${PORT}`)
});