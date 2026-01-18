const joi = require('joi');
// const reviews = require('./models/reviews');
// const listing = require('./models/listing');


module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        price: joi.number().required().min(0),
        country: joi.string().required(),
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
