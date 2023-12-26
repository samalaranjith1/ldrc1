const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");
const DriverRegistrationSchema = require("../models/driverRegistration");
const driverRegistration = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;
  try {
    const check = await DriverRegistrationSchema.findOne(
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

module.exports = {
  driverRegistration,
};

// driver details has a feature to edit his details
