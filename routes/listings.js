const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");

const listing = require("../models/listing.js");
const {isLoggedin, isOwner, validationListing} = require("../middleware.js");
// Validation for Schema


//index route
router.get("/",WrapAsync(async(req,res)=>{
   const storelistings = await listing.find();
   res.render("listings/index.ejs",{storelistings});
}));



//Create new route
router.get("/new/",isLoggedin,(req,res)=>{
    res.render("listings/new.ejs");
});

router.post("/",validationListing,WrapAsync(async(req,res,next)=>{
    
    console.log(req.user);
    let newListing = new listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save()
    req.flash("success","New listing created !"); // flash message
    res.redirect("/listings");
    
}));


//Show route
router.get("/:id",WrapAsync(async(req,res)=>{
    let {id} = req.params;
    let showall = await listing.findById(id).populate({path:"reviews", populate:{path:"author"}}).populate("owner");
    if(!showall){
        req.flash("error","Listing you requested does not exist!");  // error 
        return res.redirect("/listings");
    }
    // console.log(showall);
    res.render("listings/show.ejs",{showall});
}));



//Update & edit routes
router.get("/:id/edit",isLoggedin,isOwner,WrapAsync(async(req,res)=>{
    let {id} = req.params;
     let editlisting = await listing.findById(id);
     if(!editlisting){
        req.flash("error","Listing you requested does not exist!");
        return res.redirect("/listings");
    }
    res.render("listings/edit.ejs",{editlisting});
}));

router.put("/:id",validationListing,WrapAsync(async(req,res)=>{
        let {id} = req.params;
        
     let ulisting = await listing.findByIdAndUpdate(id,{...req.body.listing});
     req.flash("success","Update listing !"); // flash message
     
     res.redirect(`/listings/${id}`);
}));

//Delete Route
router.delete("/:id",isLoggedin,isOwner,WrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deletelisting = await listing.findByIdAndDelete(id);
    req.flash("error","Listing deleted !") // flash delete
    res.redirect("/listings");
}));


module.exports = router;