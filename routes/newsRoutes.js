const express = require("express");
const router = express.Router();
const newsController = require("../controllers/news.Controller");
const { body } = require("express-validator");

router
  .post(
    "/",
    [
      body("category", "El campo category esta vacio").notEmpty(),
      body(
        "category",
        "Debe contener un minimo de 4 y maximo de 12 caracteres"
      ).isLength({
        min: 4,
        max: 12,
      }),
      body("title", "El campo title esta vacio").notEmpty(),
      body(
        "title",
        "Debe contener un minimo de 4 y maximo de 100 caracteres"
      ).isLength({
        min: 4,
        max: 500,
      }),
      body("description", "El campo description esta vacio").notEmpty(),
      body(
        "description",
        "Debe contener un minimo de 8 y maximo de 200 caracteres"
      ).isLength({
        min: 8,
        max: 500,
      }),
      body("content", "El campo content esta vacio").notEmpty(),
      body(
        "content",
        "Debe contener un minimo de 8 y maximo de 10000 caracteres"
      ).isLength({
        min: 8,
        max: 10000,
      }),
    ],
    newsController.crearNews
  )

  router.get("/", newsController.verNews)
  router.get("/:id", newsController.verNew)
  router.put("/:id", newsController.modificarNews)
  router.delete("/:id", newsController.eliminarNews);

const app = express();
app.get("/prueba", (req, res) => {
    res.send("esto es una prueba de peticion get");
});
module.exports = router