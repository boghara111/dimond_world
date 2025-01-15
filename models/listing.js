const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Price Schema
const dimondPrice = new Schema({
    price1: Number,
    price2: Number,
    price3: Number,
    price4: Number,
    price5: Number,

    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Associate with user
});


// Listing Schema
const listingSchema = new Schema({
    no: Number,
    name: {
        type: String,
        required: true,
    },
    A1: Number, A2: Number, A3: Number, A4: Number, A5: Number, A6: Number, A7: Number, A8: Number, A9: Number, A10: Number, A11: Number,
    A12: Number, A13: Number, A14: Number, A15: Number, A16: Number, A17: Number, A18: Number, A19: Number, A20: Number, A21: Number, A22: Number,
    A23: Number, A24: Number, A25: Number, A26: Number, A27: Number, A28: Number, A29: Number, A30: Number, A31: Number, A32: Number, A33: Number,

    B1: Number, B2: Number, B3: Number, B4: Number, B5: Number, B6: Number, B7: Number, B8: Number, B9: Number, B10: Number, B11: Number, 
    B12: Number, B13: Number, B14: Number, B15: Number, B16: Number, B17: Number, B18: Number, B19: Number, B20: Number, B21: Number, B22: Number, 
    B23: Number, B24: Number, B25: Number, B26: Number, B27: Number, B28: Number, B29: Number, B30: Number, B31: Number, B32: Number, B33: Number,

    C1: Number, C2: Number, C3: Number, C4: Number, C5: Number, C6: Number, C7: Number, C8: Number, C9: Number, C10: Number, C11: Number, 
    C12: Number, C13: Number, C14: Number, C15: Number, C16: Number, C17: Number, C18: Number, C19: Number, C20: Number, C21: Number, C22: Number, 
    C23: Number, C24: Number, C25: Number, C26: Number, C27: Number, C28: Number, C29: Number, C30: Number, C31: Number, C32: Number, C33: Number,

    D1: Number, D2: Number, D3: Number, D4: Number, D5: Number, D6: Number, D7: Number, D8: Number, D9: Number, D10: Number, D11: Number, 
    D12: Number, D13: Number, D14: Number, D15: Number, D16: Number, D17: Number, D18: Number, D19: Number, D20: Number, D21: Number, D22: Number, 
    D23: Number, D24: Number, D25: Number, D26: Number, D27: Number, D28: Number, D29: Number, D30: Number, D31: Number, D32: Number, D33: Number,

    E1: Number, E2: Number, E3: Number, E4: Number, E5: Number, E6: Number, E7: Number, E8: Number, E9: Number, E10: Number, E11: Number, 
    E12: Number, E13: Number, E14: Number, E15: Number, E16: Number, E17: Number, E18: Number, E19: Number, E20: Number, E21: Number, E22: Number, 
    E23: Number, E24: Number, E25: Number, E26: Number, E27: Number, E28: Number, E29: Number, E30: Number, E31: Number, E32: Number, E33: Number,

    owner: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Associate with user
    
});




// Create models
const Price = mongoose.model("Price", dimondPrice);
const Listing = mongoose.model("Listing", listingSchema);

// Export both models
module.exports = {
    Price,
    Listing,
};
