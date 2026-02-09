const mongoose = require("mongoose");
const schema = mongoose.Schema;
const review = require("./reviews.js");
const { ref, required, string } = require("joi");

const listingSchema = new schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,


    },
    image: {
        filename: {
            type: String,
            default: "istingimage"
        },
        url: {
            type: String,
            default: "https://images.unsplash.com/photo-1656265327059-2f06a2e26db7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            set: (v) => v === "" ? "https://images.unsplash.com/photo-1656265327059-2f06a2e26db7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
        },
    },
    price: {
        type: Number,
        default: 0,
        required: true,

    },
    location: {
        type: String,
        required: true,

    },
    country: {
        type: String,
        required: true,

    },
    reviews: [
        {
            type: schema.Types.ObjectId,
            ref: "Review",

        },
    ],
    owner: {
        type: schema.Types.ObjectId,
        ref: "User",
    },
    category: {
        type: String,
        enum: ["Mountains", "Rooms", "Castles", "Iconic Cities", "Amazing Pools", "Camping", "Farms", "Arctice"],
        required: true,
    },
    geometry: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  propertyDetail:{
    type:String,

  }

});


const Listing = listingSchema.post("findOneAndDelete", async (listing) => {
    if (listing) {
        await review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const listing = mongoose.model("listing", listingSchema);
module.exports = listing; 