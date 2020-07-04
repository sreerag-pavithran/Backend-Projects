const mongoose  = require('mongoose');
require('dotenv').config();

mongoose
    .connect(process.env.DB ,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log('MongoDB Connected Successfully'))
    .catch((err)=> console.log('Error Occured while connecting to MongoDB', err))