const express = require('express');

// Adds cors and log middleware
const cors = require('cors');
const logger = require('morgan');
require('dotenv').config();

// Sets up mongodb connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, err => {
    if (err) {
        console.log(`Error connecting mongo: ${err}`)
    };
    console.log('Db open.')
});
const Card = require('./models/card');

const server = express();

server.use(
    express.json(),
    logger('dev'),
    cors()
);

const PORT = process.env.PORT || 4300;

server.get('/', (req, res) => {
    Card.find({})
    .then( cards => {
        res.json(cards)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ message: `Could not fetch cards: ${err}`})
    })
});

// server.post('/', (req, res) => {
//     const postedCard = req.body;
//     if (postedCard.answer && postedCard.clues.length === 10){
//         const newCard = new Card({ 
//             answer: postedCard.answer,
//             clues: postedCard.clues 
//         });
//         newCard.save()
//             .then( (cardID) => {
//                 console.log(`${postedCard.answer} added successfully!`)
//                 Card.findById(cardID)
//                     .then( card => {
//                         console.log(card)
//                         res.status(201).json(card[0])
//                     })
//             })
//             .catch(err => {
//                 console.log(`Unable to add new card: ${err}`)
//             })
//     } else {
//         res.status(400).json({
//             message: "New card needs answer and clue fields filled."
//         })
//     }
// })

server.listen( PORT, () => {
    console.log(`Server is listening on ${PORT}`)
});