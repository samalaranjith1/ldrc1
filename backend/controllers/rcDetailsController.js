const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const rcDetails = require("../models/rcDetails");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();
const userList = require("../models/userList");

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const rcDetailsDashboard = asyncWrapper(async (req, res) => {
  const { searchId, skip } = req.params;
  try {
    const task = rcDetails.find({ driverEmail: searchId });
    if (!task) {
      return next(
        createCustomError(`No agent details with id : ${searchId}`, 404)
      );
    }
    result = task.skip(skip * 4).limit(4);
    const data = await result;
    res.status(200).json({ data: data });
  } catch (error) {
    console.log(error);
  }
});
const rcDetailsController = asyncWrapper(async (req, res) => {
  const rcPhoto = await cloudinary.uploader.upload(req.files.rcPhoto[0].path, {
    use_filename: true,
    folder: "rc-images",
  });
  fs.unlinkSync(req.files.rcPhoto[0].path);

  const data = { ...req.body.formData };
  console.log(data);

  data.rcPhoto = rcPhoto.secure_url;

  if (data.paymentWay === "OnlineTransfer") {
    const paymentScreenshot = await cloudinary.uploader.upload(
      req.files.paymentScreenshot[0].path,
      {
        use_filename: true,
        folder: "rc-images",
      }
    );
    fs.unlinkSync(req.files.paymentScreenshot[0].path);
    data.paymentScreenshot = paymentScreenshot.secure_url;
  }

  try {
    // const check = await rcDetails.findOne({ phoneNumber });
    // if (check) {
    //   res.json("exist");
    // } else {
    await rcDetails.insertMany([data]);
    res.json("Details Submitted");
    // }
  } catch (e) {
    res.json(e.response.message);
  }
});

module.exports = {
  rcDetailsController,
  rcDetailsDashboard,
};

// driver details has a feature to edit his details
