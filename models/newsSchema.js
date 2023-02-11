const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  img: {
    img1: {
      type: String,
      trim: true,
      required: true,
    },
    img2: {
      type: String,
      trim: true,
      required: true,
    },
    img3: {
      type: String,
      trim: true,
      required: true,
    },
  },
});

const NewsModel = mongoose.model("news", newsSchema);

module.exports = NewsModel;
