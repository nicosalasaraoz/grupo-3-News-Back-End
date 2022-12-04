const { validationResult } = require("express-validator");
const UserModel = require("../models/userSchema");

exports.crearUsuario = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, pass, repeatPass } = req.body;
  const nameExist = await UserModel.findOne({ name: req.body.name });

  if (nameExist) {
    res.status(400).json("el usuario ya esta registrado!");
  }

  try {
    const usuario1 = new UserModel(req.body);
    await usuario1.save(); //tenemos que poner esto para que mongoose guarde la info en la base de datos!
    res.send("ok");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.verUsuario = async (req, res) => {
  console.log("esta llegando un usuario");
  const usuario = await UserModel.findOne({ _id: req.params.id });
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, pass, repeatPass } = req.body;
  const nameExist = UserModel.findOne(name, email, pass, repeatPass);
  res.send(usuario);
};

exports.verUsuarios = async (req, res) => {
  console.log("estan llegando los usuarios");
  const usuarios = await UserModel.find();
  console.log(usuarios);
  res.send(usuarios);
};

exports.modificarUsuarios = async (req, res) => {
  console.log("el usuario llega");
  const usuarioEditado = await UserModel.findOneAndUpdate(
    { _id: req.params.id },
    { name: req.body.name },
    { new: true }
  );
  res.send(usuarioEditado);
};

exports.eliminarUsuarios = async (req, res) => {
  const usuarioEliminado = await UserModel.findOneAndDelete({
    _id: req.params.id,
  });
  console.log(usuarioEliminado);
  if (!usuarioEliminado) {
    res.status(404).json("No se encontro el usuario");
  } else {
    res.status(200).json("Usuario eliminado con exito");
  }
};
