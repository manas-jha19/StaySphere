const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/WrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {reviewSchema} = require("../schema.js");
const review = require("../models/reviews.js");
const listing = require("../models/listing.js");
const {isLoggedin} = require("../views/middleware.js");

// validation for review
const  validationreview = (req,res,next)=>{
   let {error} = reviewSchema.validate(req.body);
   if(error){
    let errMsg = error.details.map((el)=>el.message).join(",");
    throw new ExpressError(400,errMsg);
   }else{
    next();
   }
};

//Create review route
// post request

router.post("/",validationreview,isLoggedin,WrapAsync(async(req,res)=>{
   let listingDoc = await listing.findById(req.params.id);
    let newReview = new review (req.body.review);

    listingDoc.reviews.push(newReview);
    await newReview.save();
    await listingDoc.save();
    req.flash("success","Review created !");
    console.log("save review");
    res.redirect(`/listings/${listingDoc._id}`);
}));

// Delete reviews route

router.delete("/:reviewId",isLoggedin,WrapAsync(async(req,res)=>{
    let{id,reviewId} = req.params;

    await listing.findByIdAndUpdate(id,{$pull: {reviews : reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("error","Review deleted!");
    res.redirect(`/listings/${id}`);

}));


module.exports = router;
