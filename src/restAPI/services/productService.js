import productRepo from "../repositories/productRepo.js";
import categoryRepo from "../repositories/categoryRepo.js";
import { NotFoundError, ConflictError } from "../../common/utils/error.js";
import { redisClient } from "../../common/config/redisClient.js";

class ProductService {
  constructor() {
    this.productRepo = new productRepo();
    this.categoryRepo = new categoryRepo();
  }

  async checkExistance(field, value) {
    try {
      console.log("Service - Product: checkExistance - Started");
      let whereCondition = {};
      whereCondition[field] = value;
      const product = await this.productRepo.checkExistance(field, value);
      return product;
    } catch (error) {
      console.log("Service - Product: checkExistance - Error");
      throw error;
    }
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

      // Create a unique cache key based on filters
      const cacheKey = `products:${JSON.stringify(filters)}`;

      // Check if data is present in the cache
      const cachedData = await redisClient.get(cacheKey);
      if (cachedData) {
        console.log("Service - Product: getProducts - Cache hit");
        return JSON.parse(cachedData);
      }
      // Fetch data from the database if not in cache
      const products = await this.productRepo.getProducts(filters);

      // Format the response
      const formattedProducts = products.map((product) => {
        return {
          product_id: product.product_id,
          name: product.name,
          description: product.description || null,
          price: product.price,
          stock_quantity: product.stock_quantity,
          category_id: product.category_id,
          category: product.category ? product.category.name : null,
          status: product.status,
          createdBy: product.createdBy,
          createdAt: product.createdAt,
        };
      });

      // Cache the formatted data
      await redisClient.set(cacheKey, JSON.stringify(formattedProducts), {
        EX: 3600, // Time to live (1 hour)
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

      // Use the cache key based on the product ID
      const cacheKey = `product:${id}`;

      // Check if the product is cached
      const cachedProduct = await redisClient.get(cacheKey);
      if (cachedProduct) {
        console.log("Service - Product: getProductById - Cache hit");
        return JSON.parse(cachedProduct);
      }

      // Fetch product from the database
      const product = await this.productRepo.getProductById(id);

      if (!product) {
        throw new NotFoundError(`Invalid product ID.`);
      }

      const formattedProduct = {
        product_id: product.product_id,
        name: product.name,
        description: product.description || null,
        price: product.price,
        stock_quantity: product.stock_quantity,
        category_id: product.category_id,
        category: product.category ? product.category.name : null,
        status: product.status,
        createdBy: product.createdBy,
        createdAt: product.createdAt,
      };

      // Cache the product for future requests
      await redisClient.set(cacheKey, JSON.stringify(formattedProduct), {
        EX: 3600, // Time to live (1 hour)
      });

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

      const affectedRows = await this.productRepo.updateProduct(id, payload);

      if (affectedRows === 0) throw new NotFoundError("Invalid product ID.");

      return affectedRows;
    } catch (error) {
      console.log("Service - Product: updateProduct - Error:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      console.log("Service - Product: deleteProduct - Started");
      const productExist = await this.productRepo.deleteProduct(id);

      if (!productExist) throw new NotFoundError("Product ID not found");
      return productExist;
    } catch (error) {
      console.log("Service - Product: deleteProduct - Error:", error);
      throw error;
    }
  }
}

export default ProductService;
