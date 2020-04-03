const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cardModel = new Schema({
    clues: [String],
    answer: String
});

module.exports = mongoose.model('card', cardModel);