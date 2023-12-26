const mongoose = require("mongoose");

const DriverRegistrationSchema = new mongoose.Schema({
  agentId: {
    type: String,
    required: [true, "Please enter agentId"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  driverName: {
    type: String,
    required: [true, "Please enter driver name"],
    maxlength: [20, "Please enter driver name"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter proper phone number"],
    unique: true,
    maxlength: [10, "Please enter valid phone number without country code"],
  },
  pnOtp: {
    type: String,
    required: [true, "Please enter valid OTP"],
    trim: true,
    maxlength: [6, "Please enter valid OTP"],
  },
  emailAddress: {
    type: String,
    required: [true, "Please enter email address"],
    trim: true,
    maxlength: [10, "Please enter valid email address"],
  },
  eaOtp: {
    type: String,
    required: [true, "Please enter email OTP"],
    trim: true,
    maxlength: [6, "Please enter valid OTP"],
  },
  aadharNumber: {
    type: String,
    required: [true, "Please enter valid aadhar Number"],
    trim: true,
    maxlength: [12, "Please enter valid aadhar Number"],
  },
  aadharPhoto: {
    type: String,
    required: [true, "Please enter aadhar image"],
  },
  panCardNumber: {
    type: String,
    required: [true, "Please enter valid Pan Number"],
    trim: true,
    maxlength: [10, "Please enter valid pan Number"],
  },
  panCardPhoto: {
    type: String,
    required: [true, "Please enter Pan image"],
  },
  driverLicensePhoto: {
    type: String,
    required: [true, "Please enter driving license image"],
  },
  addressVillage: {
    type: String,
    required: [true, "Please enter village name"],
  },
  addressMondal: {
    type: String,
    required: [true, "Please enter mondal name"],
  },
  addressDistrict: {
    type: String,
    required: [true, "Please enter district name"],
  },
  addressState: {
    type: String,
    required: [true, "Please enter state name"],
  },
  addressCountry: {
    type: String,
    required: [true, "Please enter country name"],
  },
  addressPincode: {
    type: String,
    required: [true, "Please enter pincode"],
  },

  extraInput2: {
    type: String,
  },
  extraInput3: {
    type: String,
  },
});

module.exports = mongoose.model(
  "DriverRegistrationSchema",
  DriverRegistrationSchema
);
