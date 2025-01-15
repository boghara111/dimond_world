const express = require("express");
const router = express.Router();
const { Price, Listing } = require("../models/listing");
const {isLoggedIn} = require("../middleware.js");


//  Function to sum values
const sumValues = (values) => values.reduce((acc, curr) => acc + curr, 0);

// Index Route
router.get("/", isLoggedIn,async (req, res) => {
    const allPrices = await Price.find({});
    res.render("prices/price.ejs", { allPrices});
});

// New Route

router.get('/newprice',isLoggedIn, (req, res) => {
    res.render('prices/newprice.ejs');        
});

// Show Route

router.get("/:id",isLoggedIn, async (req, res) => {
    let { id } = req.params;
    // const price = await Price.findById(id);
    const price = await Price.findById(id).populate('owner');
    console.log(price);
    res.render("prices/priceshow.ejs", { price });
});

// Create Route

router.post("/", isLoggedIn,async (req, res) => {
    const newPrice = new Price(req.body.price);
    newPrice.owner = req.user._id;
    await newPrice.save();
    res.redirect("/prices");
});

// Edit Route

router.get("/:id/priceedit", isLoggedIn,async (req, res) => {
    let { id } = req.params;
    const price = await Price.findById(id);
    res.render("prices/priceedit.ejs", { price });
});

// Update Route

router.put("/:id", isLoggedIn,async (req, res) => {
    let { id } = req.params;
    await Price.findByIdAndUpdate(id, { ...req.body.price });
    res.redirect(`/listings`);
});

// Delete Route
router.delete("/:id", isLoggedIn,async (req, res) => {
    let { id } = req.params;
    let deletedPrice = await Price.findByIdAndDelete(id);
    console.log(deletedPrice);
    res.redirect("/prices");
});
module.exports = router;