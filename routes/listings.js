const express = require("express");
const router = express.Router();
const WrapAsync = require("../utils/WrapAsync");

const { isLoggedin, isOwner, validationListing } = require("../middleware.js");
const { isHost, isUser } = require("../middleware.js");
const listingController = require("../controller/listings.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//index route
router
  .route("/")
  .get(WrapAsync(listingController.index))
  .post(
    isLoggedin,
    isHost,
    upload.array("listing[image]", 5),
    validationListing,
    WrapAsync(listingController.createListings),
  ); //create listing

//Create new route
router.route("/new").get(isLoggedin, isHost, listingController.renderNewForm); //rendernew

//Show route
router
  .route("/:id")
  .get(WrapAsync(listingController.showListings))
  .put(
    isLoggedin,
    isHost,
    upload.array("listing[image]", 5),
    validationListing,
    WrapAsync(listingController.updateListing),
  ) //update
  .delete(
    isLoggedin,
    isHost,
    isOwner,
    WrapAsync(listingController.deleteListing),
  );

router
  .route("/:id/edit")
  .get(
    isLoggedin,
    isOwner,
    isHost,
    WrapAsync(listingController.renderUpdateListing),
  );

router
  .route("/:id/images/:filename")
  .delete(isOwner, WrapAsync(listingController.deleteImage));

module.exports = router;
