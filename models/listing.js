const mongoose = require("mongoose");
const Review = require("./reviews");
const User = require("./user");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true, // Title is mandatory
    trim: true, // Removes extra spaces
  },
  description: {
    type: String,
  },
  image: {
    url: String,
    filename: String,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the User model
  },
});

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await Review.deleteMany({ _id: { $in: listing.reviews } }); //delete all the reviews which comes with the current deleted listing
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

// image: {
//   type: String,
//   require: false,
//   //when the image field is undefined
//   default:
//     "https://img.freepik.com/free-vector/flat-hotel-facade-background_23-2148157379.jpg?t=st=1719816969~exp=1719820569~hmac=1ccdd18062e1631a4b99366b8271bca330c89d3bab285fa78b6cd3a3fb016c30",
//   // when the image field declare but the value if undefined
//   set: (v) =>
//     v === ""
//       ? "https://img.freepik.com/free-vector/flat-hotel-facade-background_23-2148157379.jpg?t=st=1719816969~exp=1719820569~hmac=1ccdd18062e1631a4b99366b8271bca330c89d3bab285fa78b6cd3a3fb016c30"
//       : v,
// },
