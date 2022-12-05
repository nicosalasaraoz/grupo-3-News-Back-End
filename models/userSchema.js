const mongoose = require("mongoose");

//creamos un ESQUEMA de usuarios con mongoose, que en este caso va a tener nombres
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    require: true,
    lowercase: true,
  },
  pass: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  repeatPass: {
    type: String,
    require: true,
    lowercase: true,
    trim: true,
  },
  token: {
    type: String,
    default: "",
  },
  rol: {
    type: String,
    default: "user",
  },
});

//ahora vamos con el MODELO
const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
