const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");

const listing = require("../models/listing.js");
const {isLoggedin, isOwner, validationListing} = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const {storage} =  require("../cloudConfig.js");
const { Query } = require("mongoose");
const upload = multer({storage});
// Validation for Schema


//index route
router
.route("/")
.get(WrapAsync(listingController.index))
.post(isLoggedin,
    upload.single("listing[image]"),
    validationListing,
    WrapAsync(listingController.createListings));  //create listing



//Create new route
router.route("/new")
.get(isLoggedin, listingController.renderNewForm); //rendernew



//Show route
router.route("/:id")
.get(WrapAsync(listingController.showListings))
.put(isLoggedin,
    upload.single("listing[image]"),
    validationListing,
    WrapAsync(listingController.updateListing)) //update
.delete(isLoggedin,isOwner,WrapAsync(listingController.deleteListing));




router.route("/:id/edit")
.get(isLoggedin,
    isOwner,
    WrapAsync(listingController.renderUpdateListing));

module.exports = router;