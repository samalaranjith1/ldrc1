const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    author: {
      type: String,
      //   required: true,
    },
    msg: {
      type: String,
      //   required: true,
    },
    icon: {
      type: String,
      //   required: true,
    },
  },
  { _id: false }
);

const TicketsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
    maxlength: [20, "Please enter valid name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    maxlength: [20, "Please enter valid email address"],
  },
  phoneNumber: {
    type: String,
    required: [true, "Please enter phone number"],
    maxlength: [10, "Please enter valid phone number without country code"],
  },
  subject: {
    type: String,
    required: [true, "Please enter subject"],
  },
  description: {
    type: String,
    required: [true, "Please enter description"],
  },
  comments: [commentSchema],
  status: {
    type: String,
  },
  assignedTo: {
    type: String,
  },
  assignedBy: {
    type: String,
  },
  extraInput2: {
    type: String,
  },
  extraInput3: {
    type: String,
  },
});

module.exports = mongoose.model("Tickets", TicketsSchema);
