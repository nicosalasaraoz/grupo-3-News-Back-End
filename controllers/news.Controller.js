const { validationResult } = require("express-validator");
const NewsModel = require("../models/newsSchema");

exports.crearNews = async (req, res) => {
  //trabajar con el resultado de la validacion
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const categoryExist = await NewsModel.findOne({ title: req.body.title });
  res.status(200).json(categoryExist);
  if (categoryExist) {
    return res.status(400).json("Ya existe una noticia con este titulo");
  }

  try {
    const news1 = new NewsModel(req.body);
    await news1.save(); //tenemos que poner esto para que mongoose guarde la info en la base de datos!
    res.status(200).json("la noticia fue creada correctamente");
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.verNew = async (req, res) => {
  const news = await NewsModel.findOne({ _id: req.params.id });
  if (news) {
    res.status(200).json(news);
  } else {
    res.status(404).json("No se encontro el articulo");
  }
};

exports.verNews = async (req, res) => {
  try {
    const news = await NewsModel.find();
    res.status(200).json(news);
  } catch (error) {
    console.log(error);
    res.status(404).json({
            mensaje: "Error al buscar los productos" });
  }
};

exports.modificarNews = async (req, res) => {
  try{
    //extraer id de la ruta y los datos del objeto a actualizar
    //validar los datos y luego solicitar a la BD actualizar el producto
  const newsEditado = await NewsModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
  res.send(newsEditado);
  res.status(200).json({
            mensaje: "Producto editado correctamente",
        });
      }
  catch(error){
    console.log(error);
    res.status(400).json({mensaje:"Error al intentar editar el producto",})
  }
};

exports.eliminarNews = async (req, res) => {
  try {
        //extraer id de la ruta  y luego solicitar a la BD borrar el producto
         const newsEliminado = await NewsModel.findByIdAndDelete( {_id: req.params.id});
        //respondemos al FE
        res.send("news eliminada");
        res.status(200).json({
            mensaje: "Producto borrado correctamente",
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al intentar borrar el producto",
        });
    }
};
