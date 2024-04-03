const mongoose = require('mongoose')

//Define mongodb url
const mongoUrl = 'mongodb://127.0.0.1:27017/hotels'

//Set up MongoDB Connection
mongoose.connect(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongoose.connection;

db.on('connected', () => {
    console.log("connected to mongodb server");
})

db.on('error', () => {
    console.log("Error in mongodb server");
})

db.on('disconnected', () => {
    console.log("Disconnected to mongodb server");
})

module.exports = db; 