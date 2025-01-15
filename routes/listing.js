const express = require("express");
const router = express.Router();
const { Price, Listing } = require("../models/listing");
const {isLoggedIn} = require("../middleware.js");


// Index Route
router.get("/",isLoggedIn,async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// show in home management
router.get("/",isLoggedIn,(req, res) => {
    res.render("listings"); // Render the listings.ejs view  
});

// New Route
router.get("/new", isLoggedIn,(req, res) => {
    res.render("listings/new.ejs");
});

// Show Route
router.get("/:id",isLoggedIn, async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate('owner');
    console.log(listing);
    res.render("listings/show.ejs", { listing });
});

// Create Route
router.post("/",isLoggedIn, async (req, res) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    res.redirect("/listings");
});

// Edit Route
router.get("/:id/edit", isLoggedIn,async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/edit.ejs", { listing });
});

// update Route
router.put("/:id", isLoggedIn,async (req, res) => {
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    res.redirect(`/listings`);
});

// Delete Route
router.delete("/:id", isLoggedIn,async (req, res) => {
    let { id } = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    res.redirect("/listings");
});

module.exports = router;