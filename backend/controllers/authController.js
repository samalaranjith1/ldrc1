const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const agentDetails = require("../models/agentDetails");
const userList = require("../models/userList");
const jwt = require("jsonwebtoken");

const authLogin = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  const loginUser = await userList.findOne({ username: email });
  if (loginUser.role === "agent") {
    try {
      const check = await agentDetails.findOne(
        { email: email },
        { email: 1, password: 1 }
      );
      if (check) {
        if (check.password === password) {
          console.log(check);
          const token = jwt.sign({ email }, process.env.JWT_SECRET, {
            expiresIn: "30d",
          });
          res.status(200).json({ msg: "exist", token, role: "agent" });
        } else {
          res.json("invalid_password");
        }
      } else {
        res.json("notexist");
      }
    } catch (error) {
      res.json("fail");
    }
  }
  // try {
  //   const check = await agentDetails.findOne(
  //     { email: email },
  //     { email: 1, password: 1 }
  //   );

  //   if (check) {
  //     if (check.password === password) {
  //       console.log(check);
  //       res.json("exist");
  //     } else {
  //       res.json("invalid_password");
  //     }
  //   } else {
  //     res.json("notexist");
  //   }
  // } catch (error) {
  //   res.json("fail");
  // }
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

  const userListData = {
    username: email,
    phoneNumber: phoneNumber,
    role: "agent",
  };

  try {
    const check = await agentDetails.findOne({ email: email });
    if (check) {
      res.json("exist");
    } else {
      await agentDetails.insertMany([data]);
      await userList.create(userListData);
      res.json("notexist");
    }
  } catch (e) {
    res.json("fail");
  }
});
module.exports = {
  authLogin,
  authSignup,
};

// need to implement forgot password feature , basically it has to check below things
// 1.check whether account is present or not
// 2. if account existed then send OTP to reset password, on verification of OTP details has to updated in the database
// 3. if account details not existed ,throw an error to register for new account
