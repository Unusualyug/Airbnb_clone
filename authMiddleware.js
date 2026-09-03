//   console.log(req.user); it will be give data of the user(in console) if he is logged-in. so it is used to cjeckk the user is logged-in or not.
//isAuthenticated() will check weather the user id is in the session store or not.

const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utils/expressError");
const { listingSchema, reviewSchema } = require("./schema");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; // Save the URL the user was trying to visit
    req.flash("error", "You must be logged in to create a new Listing");
    return res.redirect("/login");
  }
  next();
};

// save the current url to reach at that page from where i ge to log-in page
module.exports.saveRedirect = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl; // Set the saved redirect URL
  }
  next();
};

module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You are not the owner of the Listing!");
    return res.redirect(`/listings/${id}/show`);
  }
  next();
};

module.exports.validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body);
  if (error) {
    let errMessage = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, errMessage)); // Pass the error to the next handler
  } else {
    next();
  }
};

module.exports.validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMessage = error.details.map((el) => el.message).join(", ");
    return next(new ExpressError(400, errMessage)); // Pass the error to the next handler
  } else {
    next();
  }
};
module.exports.isReviewOther = async (req, res, next) => {
  let { id, reviewId } = req.params;
  let review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the owner of the Review!");
    return res.redirect(`/listings/${id}/show`);
  }
  next();
};
