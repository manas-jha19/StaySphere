const express = require('express');
const app = express();
const mongoose = require('mongoose');
const listing = require("./models/listing.js");
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate');
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const flash = require("connect-flash");

const User = require("./models/user.js");
const LocalStrategy = require("passport-local");


const listingsroute = require("./routes/listings.js");
const reviewsRoute = require("./routes/reviews.js");
const userRoute = require("./routes/user.js");
const passport = require('passport');



const mongo_url = "mongodb://127.0.0.1:27017/staysphere";
main()
.then((res)=>{
    console.log("db connected");
})
.catch((err)=>{
    console.log("something wrong in db");
})
async function main() {
    mongoose.connect(mongo_url);
};

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);

const sessionSection ={
     secret:"spersecretcode",
     resave: false,
     saveUninitialized: true,
     cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge:  7 * 24 * 60 * 60 * 1000,
        httpOnly: true
     }
};
app.use(session(sessionSection));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

// static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// static serialize and deserialize method for passport session 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/",(req,res)=>{
    res.send("I am root");
});



app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.deleteMsg = req.flash("error");
    res.locals.reqUser = req.user;
    next(); 
});

// app.get("/demouser",async(req,res)=>{
//     const demoUser = new User({
//         email:"demo@gamil.com",
//         username:"demo-delta",
//     });
//     const regusterUser = await User.register(demoUser, "helloWorld");
//     res.send(regusterUser);
// });

app.use("/listings", listingsroute);
app.use("/listings/:id/reviews", reviewsRoute);
app.use("/", userRoute);

// Middleware

app.use((req,res,next)=>{
   next(new ExpressError(404,"Page not Found!"));
});

app.use((err,req,res,next)=>{
    let{statusCode=500 , message="Something went wrong"} = err;
    // res.status(statusCode).send(message);
    res.status(statusCode).render("listings/error.ejs",{message});
});

app.listen(8080,()=>{
    console.log("Port listening:",8080);
});