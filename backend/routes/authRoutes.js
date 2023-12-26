const express = require("express");
const router = express.Router();
const { authLogin, authSignup } = require("../controllers/authController");

router.route("/login").post(authLogin);
router.route("/signup").post(authSignup);

module.exports = router;
