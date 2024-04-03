const express = require("express")
const router = express.Router()
const Person = require('../models/Person')

router.post('/', async (req, res) => {
    try {
        const data = req.body
        const newPerson = new Person(data)
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
        const response = await Person.find()
        console.log("User found");
        res.status(200).json(response)
    } catch (error) {
        console.log(error);
        res.status(500).json()
    }
})

router.get('/:work', async (req, res) => {
    try {
        const workType = req.params.work;
        const workList = ['chef', 'waiter', 'manager']

        if (workList.includes(workType)) {
            const response = await Person.find({ work: workType });
            console.log("Found");
            res.status(200).json(response)
        } else {
            res.status(404).json("Invalid work type")
        }
    } catch (error) {
        res.status(500).json("Internal error")
    }
})

router.put('/:id', async (req, res) => {
    try {
        const personId = req.params.id;
        const updateData = req.body;

        const response = await Person.findByIdAndUpdate(personId, updateData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: "Person not found" })
        }

        console.log("Data updated")
        res.status(200).json(response)
    } catch (error) {
        res.status(404).json(error)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const response = await Person.deleteOne({ _id: userId })
        if (!response) {
            res.status(404).json({ error: "User not found" })
        }
        console.log("User Deleted");
        res.status(200).json(response)
    } catch (error) {
        console.log("Server error");
        res.status(404).json(error)
    }
})

module.exports = router