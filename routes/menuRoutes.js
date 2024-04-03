const express = require('express')
const router = express.Router()
const Menu = require('../models/Menu')

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Menu(data)
        const response = await newPerson.save()
        console.log("Response data saved")
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json()
    }
})


router.get('/', async (req, res) => {
    try {
        const response = await Menu.find()
        console.log("Menu found");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json()
    }
})

router.get('/:taste', async (req, res) => {
    const tasteList = ["sweet", "spicy", "sour"]
    try {
        const tasteType = req.params.taste

        if (tasteList.includes(tasteType)) {
            const response = await Menu.find({ taste: tasteType })
            console.log("Menu found")
            res.status(200).json(response)
        } else {
            console.log("Internal error");
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

router.put('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const updateData = req.body;
        const response = await Menu.findByIdAndUpdate(menuId, updateData, {
            new: true,
            runValidators: true
        })
        if (!response) {
            return res.status(404).json({ error: "Menu not found" })
        }
        console.log("Menu updated")
        res.status(200).json("Menu update successfully")
    } catch (error) {
        console.log("Menu not update")
        res.status(404).json({ error: error })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const menuId = req.params.id;
        const response = await Menu.findByIdAndDelete(menuId)
        if (!response) {
            return res.status(404).json(
                { error: "Menu not found" }
            )
        }
        console.log("Menu updated")
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json(
            { error: "Server error" }
        )
    }

})

module.exports = router;

