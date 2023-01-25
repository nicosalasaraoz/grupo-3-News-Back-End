const { validationResult } = require("express-validator");
const NewsModel = require("../models/newsSchema");

exports.crearNews = async (req, res) => {
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
    res.status(200).json("ok");
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
  }
};

exports.modificarNews = async (req, res) => {
  const newsEditado = await NewsModel.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true }
  );
  res.send(newsEditado);
};

exports.eliminarNews = async (req, res) => {
  const newsEliminado = await NewsModel.findOneAndDelete({
    _id: req.params.id,
  });
  res.send("news eliminada");
};
