const express = require("express");
const router = express.Router({mergeParams: true});
const WrapAsync = require("../utils/WrapAsync.js");
const review = require("../models/reviews.js");
const listing = require("../models/listing.js");
const {isLoggedin, validationreview, isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controller/reviews.js");


//Create review route
// post request

router.post("/",validationreview,isLoggedin,WrapAsync(reviewController.createReview));

// Delete reviews route

router.delete("/:reviewId",isLoggedin,isReviewAuthor,WrapAsync(reviewController.destroyReview));


module.exports = router;
