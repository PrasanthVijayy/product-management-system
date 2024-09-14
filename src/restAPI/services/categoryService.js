import categoryRepo from "../repositories/categoryRepo.js";

const userService = {
  async checkExistance(payload) {
    try {
      console.log("Service - Category: checkExistance - Initiated");
      return await categoryRepo.checkExistance(payload);
    } catch (error) {
      console.log("Service - Category: checkExistance - Error");
      throw new Error(error);
    }
  },

  async createCategory(payload) {
    try {
      console.log("Service - Category: createCategory - Initiated");
      return await categoryRepo.createCategory(payload);
    } catch (error) {
      console.log("Service - Category: createCategory - Error");
      throw new Error(error);
    }
  },

  async getCategories(payload) {
    try {
      console.log("Service - Category: getCategories - Initiated");
      return await categoryRepo.getCategories(payload);
    } catch (error) {
      console.log("Service - Category: getCategories - Error");
      throw new Error(error);
    }
  },

  async getCategory(payload) {
    try {
      console.log("Service - Category: getCategory - Initiated");
      return await categoryRepo.getCategory(payload);
    } catch (error) {
      console.log("Service - Category: getCategory - Error");
      throw new Error(error);
    }
  },

  async updateCategory(payload) {
    try {
      console.log("Service - Category: updateCategory - Initiated");
      return await categoryRepo.updateCategory(payload);
    } catch (error) {
      console.log("Service - Category: updateCategory - Error");
      throw new Error(error);
    }
  },

  async deleteCategory(payload) {
    try {
      console.log("Service - Category: deleteCategory - Initiated");
      return await categoryRepo.deleteCategory(payload);
    } catch (error) {
      console.log("Service - Category: deleteCategory - Error");
      throw new Error(error);
    }
  },
};

export default userService;
