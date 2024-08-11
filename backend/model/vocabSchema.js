const mongoose = require('mongoose');
const { Schema } = mongoose;
// const User = require('./authSchema');
// const Folder = require('./folderSchema');

const vacabSchema = new Schema({
    vocab: {
        type: String,
        required: true
    },
    meaning: {
        type: String,
        required: true
    },
    sentence: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: User
        type: String,
    },
    folderId: {
        type: String,
    }
})

const Vocabulary = mongoose.model('vocabulary', vacabSchema);

module.exports = Vocabulary;