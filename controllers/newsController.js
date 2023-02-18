const { validationResult } = require("express-validator");
const NewsModel = require("../models/newsSchema");

exports.crearNews = async (req, res) => {
  const { category, title, description,  content } = req.body

    if(category === '' && title === '' && description === '' && content === ''){
        return res.status(422).json({ msg: 'Formulario Totalmente Vacio. Se debe completar TODO el formulario'})
    }

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
  try {
      const getOneNew = await NewsModel.findOne({ _id: req.params.id });
      res.status(200).json(getOneNew)
  } catch (error) {
    res.status(404).json("No se encontro el articulo");
  }
};

exports.getNews = async (req, res) => {
  try {
    const allNews = await NewsModel.find();
    res.status(200).json(allNews);
  } catch (error) {
    console.log("error: ", error);
    res.status(404).json({
            mensaje: "Error al buscar los productos" });
  }
};

exports.modificarNews = async (req, res) => {
  const { category, title, description,  content } = req.body

    if(category === '' && title === '' && description === '' && content === ''){
        return res.status(422).json({ msg: 'Formulario Totalmente Vacio. Se debe completar TODO el formulario'})
    }

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try{
    //extraer id de la ruta y los datos del objeto a actualizar
    //validar los datos y luego solicitar a la BD actualizar el producto
  const newsEditado = await NewsModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
  res.status(200).json(newsEditado);
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
        if (newsEliminado) {
            res.status(200).json({ msg: 'Producto Eliminado' })
        } else {
            res.status(400).json({ msg: 'Producto no encontrado' })
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: "Error al intentar borrar el producto",
        });
    }
};
