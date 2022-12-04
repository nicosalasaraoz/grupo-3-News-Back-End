const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  content: {
    type: String,
    require: true,
  },
  img: {
    img1: {
      type: String,
      trim: true,
      require: true,
    },
    img2: {
      type: String,
      trim: true,
      require: true,
    },
    img3: {
      type: String,
      trim: true,
      require: true,
    },
  },
});

const NewsModel = mongoose.model("news", newsSchema);

module.exports = NewsModel;
