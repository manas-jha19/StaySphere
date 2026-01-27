const joi = require('joi');

module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        price: joi.number().required().min(0),
        country: joi.string().required(),
         category: joi.string()
      .required()
      .valid(
        "Rooms",
        "Iconic Cities",
        "Mountains",
        "Castles",
        "Amazing Pools",
        "Camping",
        "Farms",
        "Arctice"
      ),
        image: joi.object({
            url: joi.string().allow("",null),
        }).optional(),
    }).required(),
});

module.exports.reviewSchema = joi.object({
    review: joi.object({
       comment: joi.string().required(),
       rating:joi.number().required().min(1).max(5),
    }).required()
});
