const mongoose = require("mongoose");

const RcDetailsSchema = new mongoose.Schema({
  agentId: {
    type: String,
    required: [true, "Please enter agentId"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  secretKey: {
    type: String,
    required: [true, "Please enter secret key"],
    maxlength: [3, "Please enter valid secret key"],
  },
  driverPhoneNumber: {
    type: String,
    required: [true, "Please enter driver phone number"],
    unique: true,
    maxlength: [10, "Please enter valid phone number without country code"],
  },
  driverName: {
    type: String,
    required: [true, "Please enter valid name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  aadharNumber: {
    type: String,
    required: [true, "Please enter aadhar number"],
    trim: true,
    maxlength: [12, "Please enter valid aadhar number"],
  },
  rcNumber: {
    type: String,
    required: [true, "Please enter rcNumber"],
    trim: true,
    maxlength: [100, "Please enter valid rcNumber"],
  },
  rcPhoto: {
    type: String,
    required: [true, "Please enter rc Photo"],
  },
  amount: { type: String, required: [true, "Please enter amount"] },
  upiAddress: {
    type: String,
    required: [true, "Please enter upiAddress"],
    maxlength: [30, "Please enter valid upiAddress"],
  },
  extraInput2: {
    type: String,
  },
  extraInput3: {
    type: String,
  },
});

module.exports = mongoose.model("RcDetails", RcDetailsSchema);
