const express = require("express");
const router = express.Router();
const {
  authLogin,
  authSignup,
  getAgentDetails,
  updateAgentDetails,
} = require("../controllers/authController");

router.route("/login").post(authLogin);
router.route("/signup").get(getAgentDetails).post(authSignup);
router
  .route("/signup/:searchId")
  .get(getAgentDetails)
  .patch(updateAgentDetails);
module.exports = router;
