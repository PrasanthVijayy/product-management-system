import productRepo from "../repositories/productRepo.js";

module.exports = {
  async checkExistance(payload) {
    try {
      console.log("Service - Product: checkExistance - Initiated");
      return await productRepo.checkExistance(payload);
    } catch {
      console.log("Service - Product: checkExistance - Error");
      throw new Error(error);
    }
  },

  async createProduct(payload) {
    try {
      console.log("Service - Product: createProduct - Initiated");
      return await productRepo.createProduct(payload);
    } catch {
      console.log("Service - Product: createProduct - Error");
      throw new Error(error);
    }
  },

  async getProducts(payload) {
    try {
      console.log("Service - Product: getProducts - Initiated");
      return await productRepo.getProducts(payload);
    } catch {
      console.log("Service - Product: getProducts - Error");
      throw new Error(error);
    }
  },

  async getProduct(payload) {
    try {
      console.log("Service - Product: getProduct - Initiated");
      return await productRepo.getProduct(payload);
    } catch {
      console.log("Service - Product: getProduct - Error");
      throw new Error(error);
    }
  },

  async updateProduct(payload) {
    try {
      console.log("Service - Product: updateProduct - Initiated");
      return await productRepo.updateProduct(payload);
    } catch {
      console.log("Service - Product: updateProduct - Error");
      throw new Error(error);
    }
  },

  async deleteProduct(payload) {
    try {
      console.log("Service - Product: deleteProduct - Initiated");
      return await productRepo.deleteProduct(payload);
    } catch {
      console.log("Service - Product: deleteProduct - Error");
      throw new Error(error);
    }
  },
};
