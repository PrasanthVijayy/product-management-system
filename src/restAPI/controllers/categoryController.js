import categoryService from "../services/categoryService.js";
import { BadRequestError, NotFoundError } from "../../common/utils/error.js";
class CategoryController {
  constructor() {
    this.categoryService = new categoryService();
  }

  createCategory = async (req, res, next) => {
    try {
      console.log("Controller - Category: createCategory - Started");
      const { name } = req.body;
      const { uid } = req.user;

      if (!name) {
        throw new BadRequestError("Category name is required");
      }
      const payload = { name, createdBy: uid };
      const newCategory = await this.categoryService.createCategory(payload);
      console.log("Controller - Category: createCategory - Ended");

      res.status(201).json({
        message: "Category created successfully",
        newCategory,
      });
    } catch (error) {
      console.log("Controller - Category: createCategory - Error");
      next(error);
    }
  };

  getCategories = async (req, res, next) => {
    try {
      console.log("Controller - Category: getCategories - Started");

      // Extract pagination parameters from query
      const page = parseInt(req.query.page) || 1; // Default to page 1
      const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page


      // Pass parameters to the service method
      const categories = await this.categoryService.getCategories({
        page,
        limit,
      });

      console.log("Controller - Category: getCategories - Ended");
      res.status(200).json(categories);
    } catch (error) {
      console.log("Controller - Category: getCategories - Error");
      next(error);
    }
  };

  getCategoryById = async (req, res, next) => {
    try {
      console.log("Controller - Category: getCategory - Started");
      const { id } = req.params;

      if (!id) throw new BadRequestError("Category ID is required");
      const category = await this.categoryService.getCategoryById(id);

      if (!category) throw new NotFoundError("Category not found");

      console.log("Controller - Category: getCategory - Ended");

      res.status(200).json({ category });
    } catch (error) {
      console.log("Controller - Category: getCategory - Error");
      next(error);
    }
  };

  updateCategory = async (req, res, next) => {
    try {
      console.log("Controller - Category: updateCategory - Started");
      const { id } = req.params;
      const payload =  req.body;

      if (!id) throw new BadRequestError("Category ID is required");
      if (!payload.name) throw new BadRequestError("Category name is required");

      const updatedCategory = await this.categoryService.updateCategory(id, payload);

      console.log("Controller - Category: updateCategory - Ended");
      res
        .status(200)
        .json({ message: "Category updated successfully" });
    } catch (error) {
      console.log("Controller - Category: updateCategory - Error");
      next(error);
    }
  };

  deleteCategory = async (req, res, next) => {
    try {
      console.log("Controller - Category: deleteCategory - Started");
      const { id } = req.params;

      if (!id) throw new BadRequestError("Category ID is required");

      const deletedCategory = await this.categoryService.deleteCategory(id);

      if (!deletedCategory) throw new NotFoundError("Category not found");

      console.log("Controller - Category: deleteCategory - Ended");

      res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
      console.log("Controller - Category: deleteCategory - Error");
      next(error);
    }
  };
}

export default CategoryController;
