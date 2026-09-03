// Note ==> express.Router() are the way to organize your express application such that our primary app.js file does not become bloated.
// Using express.Router() is a great way to organize and separate routes when you have many routes. It helps keep your code clean and modular by allowing you to group related routes together, making it easier to maintain.

const express = require("express");
const router = express.Router();
const asyncWrap = require("../utils/asyncWrap");
const ExpressError = require("../utils/expressError");
const Listing = require("../models/listing");
const { isLoggedIn, isOwner, validateListing } = require("../middleware");
const listingController = require("../controllers/listings");
const multer = require("multer");
const { storage } = require("../cloudConfig");
const upload = multer({ storage }); //now the multer will be store the file to the cloudinary

router
  .route("/")
  .get(asyncWrap(listingController.index)) //craete load page
  .post(
    isLoggedIn,
    upload.single("listing[image]"), //we are send the image file to the cloudinary storage in "wanderlust_dev" file.
    asyncWrap(listingController.createListing)
  ); //craete (perform operation)

router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// SHOW - Display a Single Listing
router.get(
  "/:id/show", // "/listings/:id" this url will also works cause both are rendering the same page
  asyncWrap(listingController.showListing)
);

// EDIT - Form to Edit Listing
router.get(
  "/:id/edit", // "/listings/:id" this url will also works cause both are rendering the same page
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.editListing)
);

router
  .route("/:id")
  .patch(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    asyncWrap(listingController.updateListing)
  ) // UPDATE - Apply Edits to Listing
  .delete(isLoggedIn, isOwner, asyncWrap(listingController.deleteListing)); //  DELETE - Remove Listing

module.exports = router;

/*

// INDEX - Get All Listings
router.get("/", asyncWrap(listingController.index));

// NEW
router.get("/new", isLoggedIn, (req, res) => {
  res.render("listings/new");
});

// CREATE Route with Joi Validation
router.post("/", validateListing, asyncWrap(listingController.createListing));

// SHOW - Display a Single Listing
router.get(
  "/:id/show", // "/listings/:id" this url will also works cause both are rendering the same page
  asyncWrap(listingController.showListing)
);

// EDIT - Form to Edit Listing
router.get(
  "/:id/edit", // "/listings/:id" this url will also works cause both are rendering the same page
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.editListing)
);

// UPDATE - Apply Edits to Listing
router.patch(
  "/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.updateListing)
);

//  DELETE - Remove Listing
router.delete(
  "/:id",
  isLoggedIn,
  isOwner,
  asyncWrap(listingController.deleteListing)
);

module.exports = router;
*/
