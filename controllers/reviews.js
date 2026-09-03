const Listing = require("../models/listing");
const Review = require("../models/reviews");

module.exports.createReview = async (req, res, next) => {
  let id = req.params.id;
  let listing = await Listing.findById(id); // Find the listing
  if (!listing) {
    return next(new ExpressError(404, "Listing not found")); // Correct: Pass to the error handler
  }
  let newReview = new Review(req.body.review); // Create new review
  newReview.author = req.user._id; //current loggin user's data send with the review
  listing.reviews.push(newReview); // Add review to the listing

  await newReview.save();
  await listing.save();
  req.flash("success", "your Review has been posted");
  res.redirect(`/listings/${id}/show`);
};

module.exports.deleteReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } }); //we are updating the listing schema.reviews array.
  await Review.findByIdAndDelete(reviewId); //here we are delete the id from the review schema(from the review model)
  req.flash("success", "your Review has been deleted");
  res.redirect(`/listings/${id}/show`);
};
