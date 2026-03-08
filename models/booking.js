const { ref } = require("joi");
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookingSchema = new schema({
  listing: {
    type: schema.Types.ObjectId,
    ref: "Listing",
    required: true,
  },
  user: {
    type: schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  checkIn: {
    type: Date,
    required: true,
  },
  checkOut: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  bookingStatus: {
    type: String,
    enum: ["Confirmed", "Cancelled"],
    default: "Confirmed",
  },
});
module.exports = mongoose.model("Booking", bookingSchema);
