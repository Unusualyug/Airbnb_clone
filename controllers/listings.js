const Listing = require("../models/listing");
const ExpressError = require("../utils/expressError");

module.exports.index = async (req, res) => {
  let allListings = await Listing.find({});
  res.render("listings/index", { allListings });
};

module.exports.createListing = async (req, res, next) => {
  let url = req.file.path;
  let filename = req.file.filename;
  console.log(url, filename);

  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id; //store the current user's id(for Owned by )
  newListing.image = { url, filename };
  await newListing.save();
  req.flash("success", "New Listing has been created");
  res.redirect("/listings");
};
module.exports.showListing = async (req, res, next) => {
  let id = req.params.id;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  //field name of the listing
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};
module.exports.editListing = async (req, res, next) => {
  let id = req.params.id;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!!");
    return res.redirect("/listings");
  }
  // Authorization Check - Ensure the logged-in user is the owner
  if (!listing.owner.equals(req.user._id)) {
    req.flash("error", "You do not have permission to edit this listing!");
    return res.redirect(`/listings/${id}/show`);
  }
  res.render("listings/edit", { listing });
};
module.exports.updateListing = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    new: true,
  });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    listing.save();
  }

  req.flash("success", "Your Listing has been Updated");
  res.redirect(`/listings/${id}/show`);
};
module.exports.deleteListing = async (req, res, next) => {
  let id = req.params.id;
  let deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return next(new ExpressError(404, "Listing not found"));
  }
  console.log(`Deleted listing ${deletedListing}`);
  req.flash("success", "Listing has been deleted");
  res.redirect("/listings");
};
