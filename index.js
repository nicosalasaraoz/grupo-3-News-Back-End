const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const { body, validationResult } = require("express-validator");
const userRoute = require("./routes/user.Routes");
const newsRoute = require("./routes/news.Routes");

require("./dataBase");

//Middlewars: son como mini funciones que le dan acceso, permiso y validan la informacion que se envia!
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cors());
app.use("/user", userRoute);
app.use("/news", newsRoute);

//hacemos la conexion para poder enviar los datos al data base

//RUTA para crear un usuario

//RUTA para obtener los usuarios del back

//RUTA para obtener un usuario del back

//RUTA para modificar un usuario del back. Usamos 3 parametros, el id (con el que se lo busca), el body(lo que se va a modificar) y el new:true (es para decirle que me traiga el nuevo valor, el que acaba de ingresar)

//RUTA para eliminar un usuario

app.listen(3002, () => {
  console.log("server encendido en puerto 3002");
});
