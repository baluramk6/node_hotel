const mongoose = require('mongoose')

const menuShema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    taste: {
        type: String,
        enum: ["sweet", "spicy", "sour"],
        required: true
    },
    isDrink: {
        type: Boolean,
        default: false
    },
    ingredients: {
        type: [String],
        default: []
    },
    numOfSales: {
        type: Number,
        default: 0
    }
})

const Menu = mongoose.model('Menu', menuShema)
module.exports = Menu