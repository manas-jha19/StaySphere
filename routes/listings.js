const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema} = require("../schema.js");
const listing = require("../models/listing.js");
const {isLoggedin} = require("../views/middleware.js");
// Validation for Schema

const  validationListing = (req,res,next)=>{
   let {error} = listingSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }
};
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
    

    let newListing = new listing(req.body.listing);
    await newListing.save()
    req.flash("success","New listing created !"); // flash message
    res.redirect("/listings");
    
}));


//Show route
router.get("/:id",WrapAsync(async(req,res)=>{
    let {id} = req.params;
    let showall = await listing.findById(id).populate("reviews");
    if(!showall){
        req.flash("error","Listing you requested does not exist!");  // error 
        return res.redirect("/listings");
    }
    // console.log(showall);
    res.render("listings/show.ejs",{showall});
}));



//Update & edit routes
router.get("/:id/edit",isLoggedin,WrapAsync(async(req,res)=>{
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
router.delete("/:id",isLoggedin,WrapAsync(async(req,res)=>{
    let {id} = req.params;
    let deletelisting = await listing.findByIdAndDelete(id);
    req.flash("error","Listing deleted !") // flash delete
    res.redirect("/listings");
}));


module.exports = router;