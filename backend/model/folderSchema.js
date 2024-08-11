const mongoose = require('mongoose');
const { Schema } = mongoose;
// const User = require('./authSchema');

const folderSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    userId: {
        // type: mongoose.Schema.Types.ObjectId,
        // ref: User
        type: String,
    }
})

const Folder = mongoose.model('folder', folderSchema);

module.exports = Folder;