import categoryRepo from "../repositories/categoryRepo.js";
import { ConflictError, NotFoundError } from "../../common/utils/error.js";

class userService {
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

      return await this.categoryRepo.createCategory(payload);
    } catch (error) {
      console.log("Service - Category: createCategory - Error");
      throw error; // Just throw the original error
    }
  }

  async getCategories({ page, limit }) {
    try {
      console.log("Service - Category: getCategories - Initiated");

      const offset = (page - 1) * limit; // Calculate offset for pagination

      // Pass parameters to the repository method
      const { categories, total } = await this.categoryRepo.getCategories({
        limit,
        offset,
      });

      return { total, categories }; // Return both categories and total count
    } catch (error) {
      console.log("Service - Category: getCategories - Error");
      throw error; // Propagate the error up
    }
  }

  async getCategoryById(payload) {
    try {
      console.log("Service - Category: getCategory - Initiated");
      return await this.categoryRepo.getCategoryById(payload);
    } catch (error) {
      console.log("Service - Category: getCategory - Error");
      throw new Error(error);
    }
  }

  async updateCategory(id, payload) {
    try {
      console.log("Service - Category: updateCategory - Initiated");

      const idExist = await this.categoryRepo.checkExistance("id", id);
      console.log("idExist", idExist);
      if (!idExist) throw new NotFoundError("Invalid category ID");

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
      return await this.categoryRepo.deleteCategory(id);
    } catch (error) {
      console.log("Service - Category: deleteCategory - Error");
      throw new Error(error);
    }
  }
}

export default userService;
