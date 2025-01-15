const mongoose = require("mongoose");
// const {initPrice,initData } = require("./data.js");
const initData  = require("./data.js");
const { Price, Listing } = require("../models/listing");


// api browser
const MONOG_URL = "mongodb://127.0.0.1:27017/dimond";

main().then(() => {
    console.log("Conected to DB");
}).catch((err) => {
    console.log(err);
});

async function main() {
    await mongoose.connect(MONOG_URL);
}   


const initDB = async () => {
    try {
        // Clear existing data
        await Listing.deleteMany({});
        await Price.deleteMany({}); // Ensure you clear the Price collection too

        initData.data = initData.data.map((obj) => ({...obj,owner: "66efbe881f4302fb6e02c7fb"}));
        initData.price = initData.price.map((obj) => ({...obj,owner: "66efbe881f4302fb6e02c7fb"}));

        // Insert new price data
        await Price.insertMany(initData.price); // Assuming initData has priceData array

        // Insert new listing data
        await Listing.insertMany(initData.data);
        
        console.log("Data was initialized");
    } catch (error) {
        console.error("Error initializing data:", error);
    }
};

initDB();

// const initDB = async () => {
//     await Listing.deleteMany({});
//     await Price.insertMany(Price)
//     await Listing.insertMany(initData.data);
//     console.log("data was intialized");
// }