const mongoose = require('mongoose');
const { Schema } = mongoose;

const vacabSchema = new Schema({
    vocab: {
        type: String
    },
    meaning: {
        type: String,
    }
})

const Vocabulary = mongoose.model('vocabulary', vacabSchema);

module.exports = Vocabulary;