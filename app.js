if(process.env.NODE_ENV != "production"){
    require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
// const flash = require('connect-flash');
app.use(express.static('public/css'));
app.use(express.static('public/js'));
const ejsMate = require('ejs-mate');//boilerplate
const session = require("express-session");
const MongoStore= require('connect-mongo');
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const dbUrl = process.env.ATLASDB_URL;


const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
   secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error",() => {
  console.log("Error in MONGO SESSION STORE",err);
});

const sessionOptions ={
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
      maxAge:  7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    },
  };
  
app.use(session(sessionOptions));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'));
passport.use(new LocalStrategy(User.authenticate()));
 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
 

app.use((req,res,next) => {
    res.locals.currUser = req.user;
    next();
});

// router files
const listingRouter = require("./routes/listing.js");
const priceRouter = require("./routes/price.js");
const employRouter = require("./routes/employ.js");

const indexRouter = require("./routes/index.js");
const userRouter = require("./routes/user.js");





// Function to connect to MongoDB
async function main() {
    await mongoose.connect(dbUrl);
    console.log("Connected to DB");
}

// Connect to MongoDB
main().catch((err) => {
    console.log(err);
});

// Basic root route
app.get("/", (req, res) => {
    res.redirect("/home");
});

// Set up view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));


app.engine('ejs',ejsMate);//boilerplate


// Serve static files (optional, for CSS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Use session to store data (if needed)
app.use(session({ secret: 'your_secret', resave: false, saveUninitialized: true }));


app.use("/listings",listingRouter);
app.use("/prices",priceRouter);
app.use("/employs",employRouter);
app.use("/home",indexRouter);
app.use("/",userRouter);
app.use("/employs", employRouter);



app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});

// Node.js Route for Rendering Table
app.get('/table', (req, res) => {
  // Example of sending data to the template
  res.render('index', {
      allListings: listings,    // data for the table
      currUser: currentUser,    // current user data
      allPrices: prices         // price data
  });
});


// Start the server
app.listen(8080, () => {
    console.log("Server is listening on port 8080");
});
