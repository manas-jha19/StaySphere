const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const WrapAsync = require("../utils/WrapAsync.js");
const passport = require("passport");
const { storeRedirectUrl } = require("../views/middleware.js");

router.get("/signup",(req,res)=>{

    res.render("user/user.ejs");
});

router.post("/signup",WrapAsync(async(req,res,next)=>{
    try{

         let{email,username,password} = req.body;
    let newUser = new User({email ,username});
    let putUser = await User.register(newUser,password);
    console.log(putUser);
    req.login(putUser,(err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","Welcome to StaySphere")
    res.redirect("/listings");
    })
    
    }
    catch(e){
        req.flash("error", e.message);
        res.redirect("/signup");
    };
}));

router.get("/login",(req,res)=>{
    res.render("user/login.ejs");
});

router.post("/login",storeRedirectUrl,passport.authenticate("local",{failureRedirect: "/login",failureFlash:true}),(req,res)=>{
    req.flash("success","Welcome to StaySphere ,You are logged in!");
    res.redirect(res.locals.redirectUrl || "/listings");
});

router.get("/logout",(req,res,next)=>{
    req.logout((err)=>{
        if(err){
            next(err);
        }
        req.flash("success","You logged out!");
        res.redirect("/listings");
    });
});

module.exports = router;