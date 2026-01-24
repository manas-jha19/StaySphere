const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/WrapAsync.js");
const review = require("../models/reviews.js");
const listing = require("../models/listing.js");
const {isLoggedin, validationreview, isReviewAuthor} = require("../middleware.js");

// validation for review


//Create review route
// post request

router.post("/",validationreview,isLoggedin,WrapAsync(async(req,res)=>{
   let listingDoc = await listing.findById(req.params.id);
    let newReview = new review (req.body.review);
    newReview.author = req.user._id;
    listingDoc.reviews.push(newReview);
    await newReview.save();
    await listingDoc.save();
    req.flash("success","Review created !");
    console.log("save review");
    res.redirect(`/listings/${listingDoc._id}`);
}));

// Delete reviews route

router.delete("/:reviewId",isLoggedin,isReviewAuthor,WrapAsync(async(req,res)=>{
    let{id,reviewId} = req.params;

    await listing.findByIdAndUpdate(id,{$pull: {reviews : reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("error","Review deleted!");
    res.redirect(`/listings/${id}`);

}));


module.exports = router;
