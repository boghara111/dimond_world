// routes/price.js
const express = require('express');
const router = express.Router();
const Price = require('../models/listing');
const isLoggedIn = require('../middleware/isLoggedIn');  // Make sure to define isLoggedIn middleware

// Route to show all prices for a specific user
router.get('/', isLoggedIn, async (req, res) => {
    const allPrices = await Price.find({ owner: req.user._id });
    res.render('prices/show', { allPrices });
});

// Route to show the form for adding/editing prices
router.get('/new', isLoggedIn, (req, res) => {
    res.render('prices/new');
});

// Route to handle saving new or updated prices
router.post('/', isLoggedIn, async (req, res) => {
    const { month, price1, price2, price3, price4, price5 } = req.body;

    // Check if prices already exist for the selected month
    const existingPrice = await Price.findOne({ month: month, owner: req.user._id });

    if (existingPrice) {
        // If prices already exist, update them
        existingPrice.price1 = price1;
        existingPrice.price2 = price2;
        existingPrice.price3 = price3;
        existingPrice.price4 = price4;
        existingPrice.price5 = price5;
        await existingPrice.save();
    } else {
        // Otherwise, create new price entry
        const newPrice = new Price({
            month: month,
            price1: price1,
            price2: price2,
            price3: price3,
            price4: price4,
            price5: price5,
            owner: req.user._id
        });
        await newPrice.save();
    }

    res.redirect('/prices');
});

// Route to edit a specific month's prices
router.get('/:id/edit', isLoggedIn, async (req, res) => {
    const price = await Price.findById(req.params.id);
    res.render('prices/edit', { price });
});

// Route to handle deleting prices
router.delete('/:id', isLoggedIn, async (req, res) => {
    await Price.findByIdAndDelete(req.params.id);
    res.redirect('/prices');
});

module.exports = router;
