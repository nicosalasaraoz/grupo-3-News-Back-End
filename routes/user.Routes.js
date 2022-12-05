const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.Controller");
const { body } = require("express-validator");
//dejar una sola constante! con camel

router
  .post(
    "/register",
    [
      body("email", "El campo email esta vacio").notEmpty(),
      body("email", "Email no valido").isEmail(),
      body(
        "email",
        "Debe contener un minimo de 8 y maximo de 35 caracteres"
      ).isLength({
        min: 8,
        max: 35,
      }),
      body("name", "El campo name esta vacio").notEmpty(),
      body(
        "name",
        "Debe contener un minimo de 4 y maximo de 30 caracteres"
      ).isLength({
        min: 4,
        max: 30,
      }),
      body("pass", "El campo pass esta vacio").notEmpty(),
      body(
        "pass",
        "Debe contener un minimo de 8 y maximo de 20 caracteres"
      ).isLength({
        min: 8,
        max: 20,
      }),
      body("repeatPass", "El campo repeatPass esta vacio").notEmpty(),
      body(
        "repeatPass",
        "Debe contener un minimo de 8 y maximo de 20 caracteres"
      ).isLength({
        min: 8,
        max: 20,
      }),
    ],
    userController.crearUsuario
  )
  .post("/login", userController.loginUsuario)
  .post("/logout", userController.logoutUsuario)

  //las rutas van desde la mas generica a la mas especifica. ejemplo id!
  .get("/", userController.verUsuarios)
  .get("/:id", userController.verUsuario)
  .put("/:id", userController.modificarUsuarios)
  .delete("/:id", userController.eliminarUsuarios);

module.exports = router;
