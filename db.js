const mongoose = require('mongoose')
require('dotenv').config()

// const mongoUrlLocal = process.env.MONGODB_URL_LOCAL;
const mongoUrl = process.env.MONGODB_URL;

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