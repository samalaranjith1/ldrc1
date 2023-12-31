const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const uploadProductImageLocal = asyncWrapper(async (req, res) => {
  console.log(req.files);
  if (!req.files) {
    return next(createCustomError(`No File Uploaded`, 404));
  }
  const image1 = req.files.aadharPhoto;
  const image2 = req.files.panCardPhoto;
  if (!image1.mimetype.startsWith("image")) {
    return next(createCustomError(`Please Upload Image`, 404));
  }

  const imagePath = path.join(
    __dirname,
    "../public/uploads/" + `${image1.name}`
  );
  const imagePath1 = path.join(
    __dirname,
    "../public/uploads/" + `${image2.name}`
  );
  await image2.mv(imagePath1);
  return res.status(200).json({ image: { src: `/uploads/${image1.name}` } });
});

const uploadProductImage = async (req, res) => {
  console.log(req.files);
  const result = await cloudinary.uploader.upload(
    req.files.aadharPhoto.tempFilePath,
    {
      use_filename: true,
      folder: "file-upload",
    }
  );
  fs.unlinkSync(req.files.aadharPhoto.tempFilePath);

  // next();
  return res.status(200).json({ image: { src: result.secure_url } });
};
// const result1 = await cloudinary.uploader.upload(
//   req.files.panCardPhoto.tempFilePath,
//   {
//     use_filename: true,
//     folder: "file-upload",
//   }
// );
// fs.unlinkSync(req.files.panCardPhoto.tempFilePath);
// req.imageurl = { image: { src: result.secure_url } };

module.exports = {
  uploadProductImage,
};
