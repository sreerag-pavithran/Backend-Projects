const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let userSchema = Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    number: {
        type: Number,
        required: true
    },
    addressOne: {
        type: String,
        required: true
    },
    addressTwo: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    cart: {
        type: Array,
        default: void 0
    }
});

let User = mongoose.model('user', userSchema);
module.exports = User;