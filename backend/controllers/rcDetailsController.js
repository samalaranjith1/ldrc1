const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const rcDetails = require("../models/rcDetails");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const rcDetailsController = asyncWrapper(async (req, res) => {
  const rcPhoto = await cloudinary.uploader.upload(req.files.rcPhoto[0].path, {
    use_filename: true,
    folder: "rc-images",
  });
  fs.unlinkSync(req.files.rcPhoto[0].path);

  const data = { ...req.body.formData };
  data.rcPhoto = rcPhoto.secure_url;

  const {
    agentId,
    secretKey,
    driverName,
    aadharNumber,
    upiAddress,
    driverPhoneNumber,
  } = req.body;
  try {
    // const check = await rcDetails.findOne({ phoneNumber });
    // if (check) {
    //   res.json("exist");
    // } else {
    await rcDetails.insertMany([data]);
    res.json("Details Submitted");
    // }
  } catch (e) {
    res.json(e);
  }
});

module.exports = {
  rcDetailsController,
};

// driver details has a feature to edit his details
