const express = require("express");
const router = express.Router({ mergeParams: true }); //used when we have more than one url data like ":id" and ":reviewId"
// or in another words, It ensures that the parameters from the parent route (like :id) are available in the child router.

const Review = require("../models/reviews");
const Listing = require("../models/listing");

const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/expressError");
const { validateReview, isLoggedIn, isReviewOther } = require("../authMiddleware");
const reviewController = require("../controllers/reviews");
// REVIEWS

router.post(
  "/",
  isLoggedIn,
  validateReview,
  asyncWrap(reviewController.createReview)
);

router.delete(
  "/:reviewId",
  isLoggedIn,
  isReviewOther,
  asyncWrap(reviewController.deleteReview)
);
module.exports = router;
