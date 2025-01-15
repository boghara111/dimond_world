const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
    res.render("user/home.ejs"); // Render the listings.ejs view
});

module.exports = router;