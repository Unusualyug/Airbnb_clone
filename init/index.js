const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");

mongoose
  .connect("mongodb://127.0.0.1:27017/major", {
    useNewUrlParser: true,
    useUnifiedTopology: true, //Improves performance and fixes deprecation warnings.
  })
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection error:", err));

const initDB = async () => {
  try {
    await Listing.deleteMany({}); // Optional: If you want to clear the listings

    initData.data = initData.data.map((obj) => ({
      ...obj,
      owner: "67b47bdec640f38a417c0d52", // The ID of the owner
    }));

    await Listing.insertMany(initData.data); // Insert data into the collection
    console.log("Data was initialized");
  } catch (error) {
    console.log(error.message);
  }
};
initDB();
