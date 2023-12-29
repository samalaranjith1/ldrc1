const express = require("express");
const app = express();
const asyncWrapper = require("./middleware/async");

// const fileUpload = require("express-fileupload");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

//routes
const authRouter = require("./routes/authRoutes");
const driverRegistrationRouter = require("./routes/driverRegistrationRoutes");

const connectDB = require("./db/connect");
require("dotenv").config();

var cors = require("cors");
app.use(cors());

const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware

app.use(express.static("./public"));
app.use(express.json());

var bodyParser = require("body-parser");

// app.use(fileUpload({ useTempFiles: true }));
app.set("view engine", "ejs"); //changes

const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

//routes
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Methods", "POST, GET, PUT");
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type");
//   next();
// });

app.use("/auth", authRouter);
app.use("/uploads", driverRegistrationRouter);

// app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 8080;

// changes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../backend/public/uploads/"));
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

app.post(
  "/uploads1",
  cpUpload,
  asyncWrapper(async (req, res) => {
    const aadharPhoto = await cloudinary.uploader.upload(
      req.files.aadharPhoto[0].path,
      {
        use_filename: true,
        folder: "file-upload",
      }
    );
    fs.unlinkSync(req.files.aadharPhoto[0].path);
    console.log(aadharPhoto.secure_url);

    const panCardPhoto = await cloudinary.uploader.upload(
      req.files.panCardPhoto[0].path,
      {
        use_filename: true,
        folder: "file-upload",
      }
    );
    fs.unlinkSync(req.files.panCardPhoto[0].path);
    console.log(panCardPhoto.secure_url);
    const driverLicensePhoto = await cloudinary.uploader.upload(
      req.files.driverLicensePhoto[0].path,
      {
        use_filename: true,
        folder: "file-upload",
      }
    );
    fs.unlinkSync(req.files.driverLicensePhoto[0].path);
    console.log(driverLicensePhoto.secure_url);
    // console.log(aadharPhoto.secure_url);
    // console.log(panCardPhoto.secure_url);
    // console.log(driverLicensePhoto.secure_url);
    console.log("complted");
    return res.send("aadharPhotoUrl");
  })
);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
