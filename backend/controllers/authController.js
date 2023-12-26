const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const agentDetails = require("../models/agentDetails");
const authLogin = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await agentDetails.findOne(
      { email: email },
      { email: 1, password: 1 }
    );

    if (check) {
      if (check.password === password) {
        console.log(check);
        res.json("exist");
      } else {
        res.json("invalid_password");
      }
    } else {
      res.json("notexist");
    }
  } catch (error) {
    res.json("fail");
  }
});

const authSignup = asyncWrapper(async (req, res) => {
  const {
    name,
    email,
    phoneNumber,
    addressCountry,
    addressState,
    addressDistrict,
    districtRegistrationNumber,
    password,
    confirmPassword,
  } = req.body;
  const data = {
    name: name,
    email: email,
    phoneNumber: phoneNumber,
    addressCountry: addressCountry,
    addressState: addressState,
    addressDistrict: addressDistrict,
    districtRegistrationNumber: districtRegistrationNumber,
    password: password,
    confirmPassword: confirmPassword,
  };

  try {
    const check = await agentDetails.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      res.json("notexist");
      await agentDetails.insertMany([data]);
    }
  } catch (e) {
    res.json("fail");
  }
});
module.exports = {
  authLogin,
  authSignup,
};
