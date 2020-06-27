const mongoose  = require('mongoose');

mongoose
    .connect('mongodb+srv://iamsreerag:admin123@cluster0-b6jtb.mongodb.net/beecafe',{
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(()=> console.log('MongoDB Connected Successfully'))
    .catch((err)=> console.log('Error Occured while connecting to MongoDB', err))