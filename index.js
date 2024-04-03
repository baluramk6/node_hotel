var express = require('express')
const db = require('./db')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send("Welcome to our hotel")
})

const personRoutes = require('./routes/personRoutes')
const menuRoutes = require('./routes/menuRoutes')

app.use("/person", personRoutes)
app.use('/menu', menuRoutes)
app.listen(5000, () => {
    console.log("listing at", 5000);
})