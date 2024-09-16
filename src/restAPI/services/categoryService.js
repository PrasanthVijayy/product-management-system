import categoryRepo from "../repositories/categoryRepo.js";
import { ConflictError, NotFoundError } from "../../common/utils/error.js";

class categoryService {
  constructor() {
    this.categoryRepo = new categoryRepo();
  }

  async createCategory(payload) {
    try {
      console.log("Service - Category: createCategory - Initiated");

      if (payload.name) {
        const categoryExist = await this.categoryRepo.checkExistance(
          "name",
          payload.name
        );
        if (categoryExist) throw new ConflictError("Category already exists");
      }
      console.log("Service - Category: createCategory - Success");
      return await this.categoryRepo.createCategory(payload);
    } catch (error) {
      console.log("Service - Category: createCategory - Error");
      throw error;
    }
  }

  async getCategories({ page = 1, limit = 10 }) {
    try {
      console.log("Service - Category: getCategories - Initiated");

      const offset = (page - 1) * limit; // Calculate offset for pagination

      const { categories, total } = await this.categoryRepo.getCategories({
        limit,
        offset,
      });
      console.log("Service - Category: getCategories - Success");

      return { total, categories }; // Return both categories and total count
    } catch (error) {
      console.log("Service - Category: getCategories - Error");
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      console.log("Service - Category: getCategoryById - Initiated");
      const category = await this.categoryRepo.getCategoryById(id);

      if (!category) throw new NotFoundError("Category not found");

      console.log("Service - Category: getCategoryById - Success");
      return category;
    } catch (error) {
      console.log("Service - Category: getCategoryById - Error");
      throw error;
    }
  }

  async updateCategory(id, payload) {
    try {
      console.log("Service - Category: updateCategory - Initiated");

      const idExist = await this.categoryRepo.checkExistance("id", id);
      if (!idExist) throw new NotFoundError("Invalid category ID");

      console.log("Service - Category: updateCategory - Success");
      // Update the category
      return await this.categoryRepo.updateCategory(id, payload);
    } catch (error) {
      console.log("Service - Category: updateCategory - Error");
      throw error; // Don't wrap the error in a new Error
    }
  }

  async deleteCategory(id) {
    try {
      console.log("Service - Category: deleteCategory - Initiated");
      const category = await this.categoryRepo.deleteCategory(id);
      if (!category) throw new NotFoundError("Category not found");

      console.log("Service - Category: deleteCategory - Success");
      return category;
    } catch (error) {
      console.log("Service - Category: deleteCategory - Error");
      throw error;
    }
  }
}

export default categoryService;
