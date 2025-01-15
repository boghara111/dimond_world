const express = require("express");
const router = express.Router();
const { Price, Listing } = require("../models/listing");
const {isLoggedIn} = require("../middleware.js");



// Employs Route
router.get('/',isLoggedIn, async (req, res) => {
    const allListings = await Listing.find();
    const allPrices = await Price.find(); // Fetch all prices

    const sums = { A: 0, B: 0, C: 0, D: 0, E: 0 };

    allListings.forEach(listing => {
        for (let i = 1; i <= 33; i++) {
            sums.A += (listing[`A${i}`] || 0);
            sums.B += (listing[`B${i}`] || 0);
            sums.C += (listing[`C${i}`] || 0);
            sums.D += (listing[`D${i}`] || 0);
            sums.E += (listing[`E${i}`] || 0);
        }
    });

    res.render('employs/showdata.ejs', {
        allListings,
        allPrices, // Include allPrices here
        sumA: sums.A,
        sumB: sums.B,
        sumC: sums.C,
        sumD: sums.D,
        sumE: sums.E,
    });
});

module.exports = router;