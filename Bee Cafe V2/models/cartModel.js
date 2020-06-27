const mongoose = require('mongoose');

let cartSchema = mongoose.Schema({
    userid: String,
    prdtid: String,
    qty: Number
})

let Cart = mongoose.model('cart', cartSchema);

module.exports = Cart;