const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  adminName: { type: String, required:  true },
  password: { type: String, required: true },
  id: { type: String },
});

module.exports = mongoose.model("admin", adminSchema );