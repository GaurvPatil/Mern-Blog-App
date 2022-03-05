const mongoose = require("mongoose");

const subscriberSchema = mongoose.Schema({
    email: { type: String, required: true },
  })
  module.exports = mongoose.model("subscribers",subscriberSchema);