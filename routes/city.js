const express = require('express');
const City = require('../models/city');

const router = express.Router();


// 1. Get All
router.get('/', async (req, res) => {
    try {
        const cities = await City.find().sort('-updatedAt');
        return res.json(cities);
    } catch (error) {
        return res.status(500).json({ error: error.message.split(',') });
    }
});

// 2. Get One
router.get('/:id', getCityById, (req, res) => {
    return res.json(res.city);
});

// 3. Create One
router.post('/', async (req, res) => {
    let city = new City({
        name: req.body.name
    });

    try {
        city = await city.save();
        return res.status(201).json(city);
    } catch (error) {
        return res.status(400).json({ error: error.message.split(',') });
    }
});

// 4. Update One
router.put('/:id', getCityById, async (req, res) => {
    if (Object.keys(req.body).length == 0) return res.status(400).json({ message: 'Nothing to update.' });

    let city = res.city;

    if (req.body.name) city.name = req.body.name;

    try {
        city = await city.save();
        return res.json(city);
    } catch (error) {
        return res.status(400).json({ error: error.message.split(',') });
    }
});

// 5. Delete One
router.delete('/:id', getCityById, async (req, res) => {
    let city = res.city;
    try {
        await city.delete();
        return res.status(204).json();
    } catch (error) {
        return res.status(500).json({ error: error.message.split(',') });
    }
});

async function getCityById(req, res, next) {
    let city;
    try {
        city = await City.findById(req.params.id);
        if (!city) return res.status(404).json({ message: "City with this id does not exist." });
    } catch (error) {
        return res.status(404).json({ message: "City with this id does not exist." });
    }

    res.city = city;

    next();
}

module.exports = router;