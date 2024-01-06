const express = require("express");
const router = express.Router();

const {
  rcDetailsController,
  rcDetailsDashboard,
} = require("../controllers/rcDetailsController");

const multer = require("multer");
const path = require("path");
const fs = require("fs");

const authMiddleware = require("../middleware/auth");

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
  { name: "rcPhoto" },
  { name: "paymentScreenshot" },
]);

router
  .route("/")
  .get(authMiddleware)
  .post(cpUpload, authMiddleware, rcDetailsController);

router.route("/:searchId").get(authMiddleware, rcDetailsDashboard);
module.exports = router;
