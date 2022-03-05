const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  category: {
    type: "string",
    required: true,
    trim:true
  },
  title: {
    type: "String",
    required: true,
  },
  coverImage: {
    type: "String",
    required: true,
  },
  body: {
    intro: {
      type: "String",
      required: true,
    },
    paragraphs: {
      type: ["String"],
      required: true,
    }
  },
  createdAt: { type: Date, default: Date.now },
  
});
module.exports = mongoose.model("news" , newsSchema );