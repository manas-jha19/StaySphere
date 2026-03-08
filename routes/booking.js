const express = require("express");
const router = express.Router({ mergeParams: true });

const Booking = require("../models/booking.js");
const Listing = require("../models/listing.js");
const { isLoggedin, isUser } = require("../middleware");

router.post("/:id/book", isLoggedin, isUser, async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (listing.owner.equals(req.user._id)) {
    req.flash("error", "Host cannot book own listing.");
    return res.redirect(`/listings/${req.params.id}`);
  }

  const { checkIn, checkOut } = req.body;

  const nights =
    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24);

  if (!checkIn || !checkOut) {
    req.flash("error", "Please select correct Dates");
    return res.redirect(`/listings/${listing._id}`);
  }

  const total = nights * listing.price;

  const booking = new Booking({
    listing: listing._id,
    user: req.user._id,
    checkIn,
    checkOut,
    totalPrice: total,
    bookingStatus: "Confirmed",
  });

  await booking.save();

  req.flash("success", "Booking Confirmed !");
  res.redirect(`/listings/${listing._id}`);
});
module.exports = router;
