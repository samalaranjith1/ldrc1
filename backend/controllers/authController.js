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

const getAgentDetails = asyncWrapper(async (req, res, next) => {
  const { searchId } = req.params;
  try {
    const task = await agentDetails.findOne({ email: searchId });
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

const updateAgentDetails = asyncWrapper(async (req, res, next) => {
  const { searchId } = req.params;

  const task = await agentDetails.findOneAndUpdate(
    { email: searchId },
    req.body.formData,
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
  authLogin,
  authSignup,
  getAgentDetails,
  updateAgentDetails,
};
// need to implement forgot password feature , basically it has to check below things
// 1.check whether account is present or not
// 2. if account existed then send OTP to reset password, on verification of OTP details has to updated in the database
// 3. if account details not existed ,throw an error to register for new account
