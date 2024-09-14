import productService from "../services/productService.js";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../../common/utils/error.js";

// Create a new product
const createProduct = async (req, res, next) => {
  try {
    console.log("Controller - Product: createProduct - Started");
    const product = await productService.createProduct(req.body);
    console.log("Controller - Product: createProduct - Ended");
    res.status(201).json(product);
  } catch (error) {
    console.log("Controller - Product: createProduct - Error");
    next(error);
  }
};

//list all products
const getProducts = async (req, res, next) => {
  try {
    console.log("Controller - Product: getProducts - Started");
    const products = await productService.getProducts();
    console.log("Controller - Product: getProducts - Ended");
    res.status(200).json(products);
  } catch (error) {
    console.log("Controller - Product: getProducts - Error");
    next(error);
  }
};

// Get a single product by ID
const getProduct = async (req, res, next) => {
  try {
    console.log("Controller - Product: getProduct - Started");
    const product = await productService.getProduct(req.params.id);
    console.log("Controller - Product: getProduct - Ended");
    res.status(200).json(product);
  } catch (error) {
    console.log("Controller - Product: getProduct - Error");
    next(error);
  }
};

// Update a product by ID
const updateProduct = async (req, res, next) => {
  try {
    console.log("Controller - Product: updateProduct - Started");
    const product = await productService.updateProduct(req.params.id, req.body);
    console.log("Controller - Product: updateProduct - Ended");
    res.status(200).json(product);
  } catch (error) {
    console.log("Controller - Product: updateProduct - Error");
    next(error);
  }
};

// Delete a product by ID
const deleteProduct = async (req, res, next) => {
  try {
    console.log("Controller - Product: deleteProduct - Started");
    const product = await productService.deleteProduct(req.params.id);
    console.log("Controller - Product: deleteProduct - Ended");
    res.status(200).json(product);
  } catch (error) {
    console.log("Controller - Product: deleteProduct - Error");
    next(error);
  }
};

const productController = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
};

export default productController;
