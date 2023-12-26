const mongoose = require("mongoose");

const RcDetailsSchema = new mongoose.Schema({
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
  aadharNumber: {
    type: String,
    required: [true, "Please enter aadhar number"],
    unique: true,
    maxlength: [12, "Please enter valid aadhar number without country code"],
  },
  aadharPhoto: {
    type: String,
    required: [true, "Please upload aadhar photo"],
    data: Buffer,
    contentType: String,
  },
  panCardNumber: {
    type: String,
    required: [true, "Please enter pancard number"],
    trim: true,
    maxlength: [10, "Please enter valid pancard number"],
  },
  panCardPhoto: {
    type: String,
    required: [true, "Please upload pancard photo"],
    data: Buffer,
    contentType: String,
  },
  driverPhoneNumber: {
    type: String,
    required: [true, "Please enter driver phone number"],
    trim: true,
    maxlength: [10, "Please enter valid phone number"],
  },
  rcNumber: {
    type: String,
    required: [true, "Please enter rc number"],
  },
  rcPhoto: {
    type: String,
    required: [true, "Please upload rc photo"],
    data: Buffer,
    contentType: String,
  },
  amount: { type: String, required: [true, "Please enter amount"] },
  extraInput2: {
    type: String,
  },
  extraInput3: {
    type: String,
  },
});

module.exports = mongoose.model("RcDetails", RcDetailsSchema);
