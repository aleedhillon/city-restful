const express = require('express');

const router = express.Router();


// 1. Get All
router.get('/', async (req, res) => {
    return res.sendFile(__dirname + '/home.html');
});

module.exports = router;