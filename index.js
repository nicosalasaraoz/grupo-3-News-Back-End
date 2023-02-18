const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const routes = require('./routes')

//llamando a la conexion a la base de datos
require("./dataBase");

//creando uns instancia de express
const app = express();

//configuramos puerto
app.set("port", process.env.PORT || 4001);
app.listen(app.get("port"), () => {
    console.log("estoy en el puerto " + app.get("port"));
});

//Middlewars: son como mini funciones que le dan acceso, permiso y validan la informacion que se envia!
app.use(cors()); //permite conexiones remotas
app.use(express.json());//interpreta el formato json
app.use(express.urlencoded({ extended: true }));// permite extraer la peticion post que viene del json
app.use(morgan("dev")); 

//cargar un archivo estatico
// app.use(express.static(path.join(__dirname, "../public")));

//rutas
//routes
app.use('/', routes)

//hacemos la conexion para poder enviar los datos al data base

//RUTA para crear un usuario

//RUTA para obtener los usuarios del back

//RUTA para obtener un usuario del back

//RUTA para modificar un usuario del back. Usamos 3 parametros, el id (con el que se lo busca), el body(lo que se va a modificar) y el new:true (es para decirle que me traiga el nuevo valor, el que acaba de ingresar)

//RUTA para eliminar un usuario
