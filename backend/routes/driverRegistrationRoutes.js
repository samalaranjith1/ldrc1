const express = require("express");
const router = express.Router();
const asyncWrapper = require("../middleware/async");

const {
  driverRegistration,
} = require("../controllers/driverRegistrationController");

const { uploadProductImage } = require("../controllers/uploadsController");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const text = __dirname;
    let result = text.substring(0, text.length - 7);
    cb(null, path.join(result, "../backend/public/uploads/"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

const cpUpload = upload.fields([
  { name: "aadharPhoto" },
  { name: "panCardPhoto" },
  { name: "driverLicensePhoto" },
]);

router.route("/").post(
  cpUpload,
  driverRegistration
  // asyncWrapper(async (req, res) => {
  //   const aadharPhoto = await cloudinary.uploader.upload(
  //     req.files.aadharPhoto[0].path,
  //     {
  //       use_filename: true,
  //       folder: "file-upload",
  //     }
  //   );
  //   fs.unlinkSync(req.files.aadharPhoto[0].path);
  //   console.log(aadharPhoto.secure_url);

  //   const panCardPhoto = await cloudinary.uploader.upload(
  //     req.files.panCardPhoto[0].path,
  //     {
  //       use_filename: true,
  //       folder: "file-upload",
  //     }
  //   );
  //   fs.unlinkSync(req.files.panCardPhoto[0].path);
  //   console.log(panCardPhoto.secure_url);
  //   const driverLicensePhoto = await cloudinary.uploader.upload(
  //     req.files.driverLicensePhoto[0].path,
  //     {
  //       use_filename: true,
  //       folder: "file-upload",
  //     }
  //   );
  //   fs.unlinkSync(req.files.driverLicensePhoto[0].path);
  //   console.log(driverLicensePhoto.secure_url);
  //   // console.log(aadharPhoto.secure_url);
  //   // console.log(panCardPhoto.secure_url);
  //   // console.log(driverLicensePhoto.secure_url);
  //   console.log("complted");
  //   return res.send("aadharPhotoUrl");
  // })
);
// router.route("/update").post(authSignup);
// router.route("/delete").post(authSignup);

// router.route("/uploads").post(uploadProductImage);

module.exports = router;
