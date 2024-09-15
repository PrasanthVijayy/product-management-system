import productRepo from "../repositories/productRepo.js";
import categoryRepo from "../repositories/categoryRepo.js";
import { NotFoundError, ConflictError } from "../../common/utils/error.js";

class ProductService {
  constructor() {
    this.productRepo = new productRepo();
    this.categoryRepo = new categoryRepo();
  }

  async getCategoryIdByName(category) {
    try {
      console.log("Service - Product: getCategoryIdByName - Started");
      const categoryRecord = await this.categoryRepo.checkExistance(
        "name",
        category
      );

      if (!categoryRecord) throw new NotFoundError("Category not found");

      // Return the category ID if the category exists
      return categoryRecord.id;
    } catch (error) {
      console.log("Service - Product: getCategoryIdByName - Error");
      throw error;
    }
  }
  async createProduct(payload) {
    try {
      console.log("Service - Product: createProduct - Started");
      return await this.productRepo.createProduct(payload);
    } catch (error) {
      throw error;
    }
  }
  async getProducts(filters) {
    try {
      console.log("Service - Product: getProducts - Started");

      const products = await this.productRepo.getProducts(filters);

      // Format the response
      const formattedProducts = products.map((product) => {
        return {
          product_id: product.product_id,
          name: product.name,
          price: product.price,
          stock_quantity: product.stock_quantity,
          category_id: product.category_id,
          category: product.category ? product.category.name : null, // Extract category name
          status: product.status,
          createdBy: product.createdBy,
          createdAt: product.createdAt,
        };
      });

      return formattedProducts;
    } catch (error) {
      console.log("Service - Product: getProducts - Error:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      console.log("Service - Product: getProductById - Started");

      const product = await this.productRepo.getProductById(id);

      // Check if the product exists
      if (!product) {
        throw new NotFoundError(`Invalid product ID.`);
      }

      const formattedProduct = {
        product_id: product.product_id,
        name: product.name,
        price: product.price,
        stock_quantity: product.stock_quantity,
        category_id: product.category_id,
        category: product.category ? product.category.name : null, // Extract category name
        status: product.status,
        createdBy: product.createdBy,
        createdAt: product.createdAt,
      };

      return formattedProduct;
    } catch (error) {
      console.log("Service - Product: getProductById - Error:", error);
      throw error;
    }
  }

  async updateProduct(id, payload) {
    try {
      console.log("Service - Product: updateProduct - Started");
      if (payload.category) {
        const category = await this.categoryRepo.checkExistance(
          "name",
          payload.category
        );
        if (!category) throw new NotFoundError("Category not found");
        payload.category_id = category.id;
      }

      return await this.productRepo.updateProduct(id, payload);
    } catch (error) {
      console.log("Service - Product: updateProduct - Error:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      console.log("Service - Product: deleteProduct - Started");
      const productExist = await this.productRepo.deleteProduct(id);

      if (!productExist) throw new NotFoundError("Invalid product ID.");
      return productExist;
    } catch (error) {
      console.log("Service - Product: deleteProduct - Error:", error);
      throw error;
    }
  }
}

export default ProductService;
