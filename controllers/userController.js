const { validationResult } = require("express-validator");
const UserModel = require("../models/userSchema");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.crearUsuario = async (req, res) => {
  const { name, email, pass, repeatPass } = req.body;
  
  if (name === '' && email === '' && pass === '' && repeatPass === '') {
        return res.status(422).json({ msg: 'Formulario Totalmente Vacio. Se debe completar TODO el formulario' })
    }
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const nameExist = await UserModel.findOne({ name: req.body.name });

  if (nameExist) {
    return res.status(400).json("el usuario ya existe!");
  }

  try {
    const salt = await bcryptjs.genSalt(10);
    const passEncrypted = await bcryptjs.hash(req.body.pass, salt);

    const objectUser = {
      name: req.body.name,
      email: req.body.email,
      pass: passEncrypted,
      repeatPass: passEncrypted,
    };
    const newUser = new UserModel(objectUser);
    await newUser.save();
    await sendMailer(req.body.username)
    res.status(201).json("Usuario creado con exito");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.loginUsuario = async (req, res) => {
  
    const { email, pass } = req.body;
    if (email === '' && pass === '') {
        return res.status(422).json({ msg: 'Formulario Totalmente Vacio. Se debe completar TODO el formulario' })
    }

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() })
    }
    try {
    const { email, pass } = req.body;
    const userExist = await UserModel.findOne({ email });

    if (!userExist) {
      res
        .status(404)
        .json({ mensaje: "el usuario y/o la contraseña son incorrectos" });
    }

    const passCheck = bcryptjs.compare(pass, userExist.pass);

    if (!passCheck) {
      res
        .status(404)
        .json({ mensaje: "el usuario y/o la contraseña son incorrectos" });
    }

    const datosYTokenUsuario = {
      user: {
        id: userExist.id,
        email: userExist.email,
        role: userExist.roleType,
      },
    };

    const token = jwt.sign(datosYTokenUsuario, process.env.JWT_SECRET);
    userExist.token = token;
    await UserModel.updateOne({ email }, userExist);
    res.status(200).json(userExist);
  } catch (error) {
    console.log(error);
  }
};

exports.logoutUser = async (req, res) => {
    try {
        await UserModel.updateOne({ _id: res.locals.user.id }, { $set: { token: '' } })
        res.json({ mensaje: 'Deslogueo ok' })
    } catch (error) {
        console.log(error)
    }
}

exports.verUsuario = async (req, res) => {
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
  const usuarios = await UserModel.find();
  res.send(usuarios);
};

exports.modificarUsuarios = async (req, res) => {
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
  if (!usuarioEliminado) {
    res.status(404).json("No se encontro el usuario");
  } else {
    res.status(200).json("Usuario eliminado con exito");
  }
};
