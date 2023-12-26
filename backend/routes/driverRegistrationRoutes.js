const express = require("express");
const router = express.Router();
const {
  driverRegistration,
} = require("../controllers/driverRegistrationController");

router.route("/").post(driverRegistration);
// router.route("/update").post(authSignup);
// router.route("/delete").post(authSignup);

module.exports = router;
