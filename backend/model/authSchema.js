const mongoose = require('mongoose');
const {Schema} = mongoose;

const authSchema = new Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('user',authSchema);
module.exports = User;