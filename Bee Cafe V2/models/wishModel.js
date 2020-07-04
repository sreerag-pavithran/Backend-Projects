const mongoose = require('mongoose');

let wishSchema = mongoose.Schema({
    userid: String,
    prdtid: String
})

let wish = mongoose.model('wish', wishSchema);
module.exports = wish;