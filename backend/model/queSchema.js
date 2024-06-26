const mongoose = require('mongoose');
const { Schema } = mongoose;

const queSchema = new Schema({
    question: {
        type: String
    },
    options: {
        type: [String],
    },
    answer: {
        type: String,
    },
})

const Question = mongoose.model('question', queSchema);

module.exports = Question;