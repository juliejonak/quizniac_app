const express = require('express');
const router = express.Router();

const Card = require('../models/card.js');

router.get('/', (req, res) => {
    Card.find({})
    .then( cards => {
        res.json(cards)
    })
    .catch( err => {
        console.log(err)
        res.status(500).json({ message: `Could not fetch cards: ${err}`})
    })
});

router.post('/', (req, res) => {
    const postedCard = req.body;
    if (postedCard.answer && postedCard.clues.length === 10){
        const newCard = new Card({ 
            answer: postedCard.answer,
            clues: postedCard.clues 
        });
        newCard.save()
            .then( (cardID) => {
                console.log(`${postedCard.answer} added successfully!`)
                Card.findById(cardID)
                    .then( card => {
                        console.log(card)
                        res.status(201).json(card[0])
                    })
            })
            .catch(err => {
                console.log(`Unable to add new card: ${err}`)
            })
    } else {
        // TODO: Add more specific error handling by what info is missing
        res.status(400).json({
            message: "A new card needs an answer and 10 clues."
        })
    }
});

router.put('/:id', (req, res) => {
    const postedCard = req.body;
    const {id} = req.params;

    if (id && postedCard.answer && postedCard.clues.length === 10){
        // {new: true} returns the updated card instead of auto-returning the old version
        Card.findByIdAndUpdate({ _id: id}, postedCard, {new: true})
            .then( (updatedCard) => {
                if(updatedCard){
                    res.status(201).json(updatedCard)
                } else {
                    res.status(404).json({
                        message: "Invalid ID. Are you sure that's what you were looking to change?"
                    })
                }
            })
            .catch( err => {
                res.status(500).json({
                    message: `There was an error updating this card. Your changes were deemed unacceptable: ${err}`
                })
            })
        }
    else {
        // TODO: Add more specific error handling by what info is missing
        res.status(400).json({
            message: "To update a card, send an answer and 10 clues."
        })
    }
})

module.exports = router;