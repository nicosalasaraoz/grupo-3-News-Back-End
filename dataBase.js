const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://Practica:sYBmCgVqngBp2EpL@cluster0.lzancsu.mongodb.net/Practicadedatabase",
  (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("se conecto a la base de datos");
    }
  }
);
