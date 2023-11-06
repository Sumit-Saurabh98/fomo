const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {type: 'string', required: true},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true},
});

const User = mongoose.model("User", userSchema);

module.exports = User;