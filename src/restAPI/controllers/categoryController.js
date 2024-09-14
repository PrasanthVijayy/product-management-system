import categoryService from "../services/categoryService.js";
import {
  BadRequestError,
  NotFoundError,
  ConflictError,
} from "../../common/utils/error.js";

// Create a new category
const createCategory = async (req, res, next) => {
  try {
    console.log("Controller - Category: createCategory - Started");
    const category = await categoryService.createCategory(req.body);
    console.log("Controller - Category: createCategory - Ended");
    res.status(201).json(category);
  } catch (error) {
    console.log("Controller - Category: createCategory - Error");
    next(error);
  }
};

// Get all categories
const getCategories = async (req, res, next) => {
  try {
    console.log("Controller - Category: getCategories - Started");
    const categories = await categoryService.getCategories();
    console.log("Controller - Category: getCategories - Ended");
    res.status(200).json(categories);
  } catch (error) {
    console.log("Controller - Category: getCategories - Error");
    next(error);
  }
};

// Get a single category by ID
const getCategory = async (req, res, next) => {
  try {
    console.log("Controller - Category: getCategory - Started");
    const category = await categoryService.getCategory(req.params.id);
    console.log("Controller - Category: getCategory - Ended");
    res.status(200).json(category);
  } catch (error) {
    console.log("Controller - Category: getCategory - Error");
    next(error);
  }
};

// Update a category by ID
const updateCategory = async (req, res, next) => {
  try {
    console.log("Controller - Category: updateCategory - Started");
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body
    );
    console.log("Controller - Category: updateCategory - Ended");
    res.status(200).json(category);
  } catch (error) {
    console.log("Controller - Category: updateCategory - Error");
    next(error);
  }
};

// Delete a category by ID
const deleteCategory = async (req, res, next) => {
  try {
    console.log("Controller - Category: deleteCategory - Started");
    const category = await categoryService.deleteCategory(req.params.id);
    console.log("Controller - Category: deleteCategory - Ended");
    res.status(200).json(category);
  } catch (error) {
    console.log("Controller - Category: deleteCategory - Error");
    next(error);
  }
};

const categoryController = {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};

export default categoryController;
