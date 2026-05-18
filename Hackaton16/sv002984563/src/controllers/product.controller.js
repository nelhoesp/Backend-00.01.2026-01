const productsModel = require("../models/product.model");

const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;

    const product = await productsModel.createProduct(
      name,
      description,
      price
    );

    return res.status(201).json({
      message: "Producto creado",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al crear producto",
    });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await productsModel.getProducts();

    return res.status(200).json(products);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener productos",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsModel.getProductById(id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al obtener producto",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await productsModel.deleteProduct(id);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado",
      });
    }

    return res.status(200).json({
      message: "Producto eliminado",
      product,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Error al eliminar producto",
    });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  deleteProduct,
};