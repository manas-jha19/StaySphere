const listing = require("../models/listing.js");
const review =  require("../models/reviews.js");


module.exports.createReview = async(req,res)=>{
   let listingDoc = await listing.findById(req.params.id);
    let newReview = new review (req.body.review);
    newReview.author = req.user._id;
    listingDoc.reviews.push(newReview);
    await newReview.save();
    await listingDoc.save();
    req.flash("success","Review created !");
    console.log("save review");
    res.redirect(`/listings/${listingDoc._id}`);
};

module.exports.destroyReview = async(req,res)=>{
    let{id,reviewId} = req.params;

    await listing.findByIdAndUpdate(id,{$pull: {reviews : reviewId}});
    await review.findByIdAndDelete(reviewId);
    req.flash("error","Review deleted!");
    res.redirect(`/listings/${id}`);

};