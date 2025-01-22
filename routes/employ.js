const express = require("express");
const router = express.Router();  // Define the router
const { Price, Listing } = require("../models/listing");
const { isLoggedIn } = require("../middleware.js");

// Employs Route
router.get('/', isLoggedIn, async (req, res) => {
    const { month } = req.query; // Get month from query params

    // Fetch listings, optionally filter by month
    const allListings = month 
        ? await Listing.find({ month }) // Filter by selected month
        : await Listing.find(); // Get all if no month is selected

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

    // Render the page, passing the filtered listings and the selected month
    res.render('employs/showdata.ejs', {
        allListings,
        allPrices,
        sumA: sums.A,
        sumB: sums.B,
        sumC: sums.C,
        sumD: sums.D,
        sumE: sums.E,
        selectedMonth: month || "", // Pass the selected month to the template
    });
});

module.exports = router;  // Export the router
