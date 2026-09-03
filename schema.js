const Joi = require("joi");
const reviews = require("./models/reviews");

module.exports.listingSchema = Joi.object({
  listing: Joi.object({
    //here listing is the object name which we are created (in new.ejs like listing[comment]) and access in app.js like req.body.listing
    title: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    image: Joi.string().allow("", null),
    country: Joi.string().required(),
    location: Joi.string().required(),
  }).required(),
});

module.exports.reviewSchema = Joi.object({
  //here review is the object name which we are created (in show.ejs like review[comment]) and access in app.js like req.body.review
  review: Joi.object({
    rating: Joi.number().required().min(1).max(5),
    comment: Joi.string().required(),
  }),
}).required();
