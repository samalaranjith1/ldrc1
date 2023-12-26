const mongoose = require("mongoose");

const AgentDetailsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    trim: true,
    maxlength: [20, "name can not be more than 20 characters"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    match: /.+\@.+\..+/,
    unique: true,
    maxlength: [20, "Please enter valid email"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter phone number"],
    unique: true,
    maxlength: [10, "Please enter valid phone number without country code"],
  },
  addressCountry: {
    type: String,
    required: [true, "Please enter country name"],
    trim: true,
    maxlength: [20, "Please enter valid country name"],
  },
  addressState: {
    type: String,
    required: [true, "Please enter state name"],
    trim: true,
    maxlength: [20, "Please enter valid state name"],
  },
  addressDistrict: {
    type: String,
    required: [true, "Please enter District name"],
    trim: true,
    maxlength: [20, "Please enter valid District name"],
  },
  districtRegistrationNumber: {
    type: String,
    required: [true, "Please enter district registration number"],
    trim: true,
    maxlength: [20, "Please enter valid district registration number"],
  },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
});

module.exports = mongoose.model("AgentDetails", AgentDetailsSchema);
