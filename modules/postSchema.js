const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  category: {
    type: "String",
    required: true,
    trim: true,
  },
  header: {
    type: "String",
    required: true,
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
    },
    subheadings: {
      type: ["Mixed"],
      required: true,
    },
    optionalImages: {
      images: {
        type: ["String"],
      },
      paragraphs: {
        type: ["String"],
      },
    },
    lastBigImageoptional: {
      type: "String",
    },
    conclusion: {
      type: ["String"],
      required: true,
    },
    comments: {
      type: ["Mixed"],
      default: [],
      required: true,
    },
    likes: { type: [String], default: [] },
  },
  createdAt: { type: Date, default: Date.now },
});

const cryptoPost = mongoose.model("crypto", postSchema);
const lfPost = mongoose.model("lifestyle&fashion", postSchema);
const spritualPost = mongoose.model("spritual", postSchema);

module.exports = {
  cryptoPost,
  lfPost,
  spritualPost,
};
