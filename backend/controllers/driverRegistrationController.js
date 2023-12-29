const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const driverRegistrations = require("../models/driverRegistration");
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

const driverRegistration = asyncWrapper(async (req, res) => {
  const aadharPhoto = await cloudinary.uploader.upload(
    req.files.aadharPhoto[0].path,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.aadharPhoto[0].path);
  const panCardPhoto = await cloudinary.uploader.upload(
    req.files.panCardPhoto[0].path,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.panCardPhoto[0].path);
  const driverLicensePhoto = await cloudinary.uploader.upload(
    req.files.driverLicensePhoto[0].path,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.driverLicensePhoto[0].path);
  const data = { ...req.body.formData };
  data.aadharPhoto = aadharPhoto.secure_url;
  data.panCardPhoto = panCardPhoto.secure_url;
  data.driverLicensePhoto = driverLicensePhoto.secure_url;
  const { emailAddress, phoneNumber } = req.body;
  try {
    const check = await driverRegistrations.findOne({ phoneNumber });
    if (check) {
      res.json("exist");
    } else {
      await driverRegistrations.insertMany([data]);
      res.json("notexist");
    }
  } catch (e) {
    res.json(e);
  }
});
//    async (req, res) => {
//   const {
//     agentId,
//     driverName,
//     phoneNumber,
//     pnOtp,
//     emailAddress,
//     eaOtp,
//     aadharNumber,
//     // aadharPhoto,
//     panCardNumber,
//     // panCardPhoto,
//     driverPhoneNumber,
//     // driverLicensePhoto,
//     addressVillage,
//     addressMondal,
//     addressDistrict,
//     addressState,
//     addressCountry,
//     addressPincode,
//     extraInput2,
//     extraInput3,
//   } = req.body;

//   const { data } = { ...req.body.formData };

//   const aadharPhoto = await cloudinary.uploader.upload(
//     req.files.aadharPhoto[0].path,
//     {
//       use_filename: true,
//       folder: "file-upload",
//     }
//   );
//   fs.unlinkSync(req.files.aadharPhoto[0].path);

//   const panCardPhoto = await cloudinary.uploader.upload(
//     req.files.panCardPhoto[0].path,
//     {
//       use_filename: true,
//       folder: "file-upload",
//     }
//   );
//   fs.unlinkSync(req.files.panCardPhoto[0].path);

//   const driverLicensePhoto = await cloudinary.uploader.upload(
//     req.files.driverLicensePhoto[0].path,
//     {
//       use_filename: true,
//       folder: "file-upload",
//     }
//   );
//   fs.unlinkSync(req.files.driverLicensePhoto[0].path);

//   data.aadharPhoto = aadharPhoto.secure_url;
//   data.panCardPhoto = panCardPhoto.secure_url;
//   data.driverLicensePhoto = driverLicensePhoto.secure_url;
//   console.log(data);
//   // console.log(req.imageurl);
//   // console.log(req.body);

//   // try {
//   //   const driverDetails = await DriverRegistrationModel.create(req.body);
//   //   res.status(200).json({ driverDetails });
//   // } catch (error) {
//   //   res.json({ msg: error.stack });
//   // }
// };
// const driverRegister = async (req, res) => {
//   const driverDetails = await DriverRegistrationModel.create(req.body);
//   res.status(StatusCodes.CREATED).json({ driverDetails });
// };

module.exports = {
  driverRegistration,
};

// driver details has a feature to edit his details
