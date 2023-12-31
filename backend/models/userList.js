const mongoose = require("mongoose");

const UserListSchema = new mongoose.Schema({
  username: {
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
  role: {
    type: String,
    required: [true, "Please enter role"],
    unique: true,
  },
});

module.exports = mongoose.model("UserList", UserListSchema);
