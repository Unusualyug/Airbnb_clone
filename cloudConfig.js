const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// config means "jodna"(we are config the cloudinary with our cloudinary account.)

cloudinary.config({
  //connect with the env file
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "wanderlust_dev",
    allowedFormates: async (req, file) => ["png", "jpg", "jpeg"], // supports promises as well
  },
});
module.exports = {
  cloudinary,
  storage,
};
