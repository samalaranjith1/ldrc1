const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const driverRegistrations = require("../models/driverRegistration");
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

  const userListData = {
    username: data.emailAddress,
    phoneNumber: data.phoneNumber,
    role: "driver",
  };
  try {
    const check = await driverRegistrations.findOne({ username });
    if (check) {
      res.json("exist");
    } else {
      await driverRegistrations.insertMany([data]);
      await userList.create(userListData);
      res.json("notexist");
    }
  } catch (e) {
    res.json(e);
  }
});

const getDriverDetails = asyncWrapper(async (req, res, next) => {
  const { searchId } = req.params;
  try {
    const task = await driverRegistrations.findOne({ emailAddress: searchId });
    if (!task) {
      return next(
        createCustomError(`No agent details with id : ${searchId}`, 404)
      );
    }
    res.status(200).json({ data: task });
  } catch (error) {
    console.log(error);
  }
});

const updateDriverDetails = asyncWrapper(async (req, res, next) => {
  const { searchId } = req.params;
  const data = { ...req.body.formData };

  console.log(req.params);
  try {
    if (req.files.aadharPhoto) {
      const aadharPhoto = await cloudinary.uploader.upload(
        req.files.aadharPhoto[0].path,
        {
          use_filename: true,
          folder: "file-upload",
        }
      );
      fs.unlinkSync(req.files.aadharPhoto[0].path);
      data.aadharPhoto = aadharPhoto.secure_url;
      console.log(data.aadharPhoto);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    if (req.files.panCardPhoto) {
      const panCardPhoto = await cloudinary.uploader.upload(
        req.files.panCardPhoto[0].path,
        {
          use_filename: true,
          folder: "file-upload",
        }
      );
      fs.unlinkSync(req.files.panCardPhoto[0].path);
      data.panCardPhoto = panCardPhoto.secure_url;
      console.log(data.panCardPhoto);
    }
  } catch (error) {
    console.log(error);
  }

  try {
    if (req.files.driverLicensePhoto) {
      const driverLicensePhoto = await cloudinary.uploader.upload(
        req.files.driverLicensePhoto[0].path,
        {
          use_filename: true,
          folder: "file-upload",
        }
      );
      fs.unlinkSync(req.files.driverLicensePhoto[0].path);
      data.driverLicensePhoto = driverLicensePhoto.secure_url;
    }
  } catch (error) {
    console.log(error);
  }

  const task = await driverRegistrations.findOneAndUpdate(
    { emailAddress: searchId },
    data,
    {
      new: true,
      runValidators: true,
      returnOriginal: false,
    }
  );
  if (!task) {
    return next(
      createCustomError(`No agent details with id : ${searchId}`, 404)
    );
  }

  res.status(200).json({ data: task });
});

module.exports = {
  driverRegistration,
  getDriverDetails,
  updateDriverDetails,
};
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

// driver details has a feature to edit his details
