import { Product, Category } from "../../common/models/index.js";
import { Op } from "sequelize";

class ProductRepo {
  async createProduct(payload) {
    try {
      return await Product.create(payload);
    } catch (error) {
      throw error;
    }
  }

  //fetch categoryId from Category table
  // async getCategoryByName(category_name) {
  //   try {
  //     console.log("Repository - Category: getCategoryByName - Initiated");
  //     const category = await Category.findOne({
  //       where: { name: category_name },
  //     });

  //     return category; // Returns null if not found
  //   } catch (error) {
  //     console.log("Repository - Category: getCategoryByName - Error");
  //     throw error;
  //   }
  // }

  async getProducts(filters) {
    try {
      console.log("Repository - Product: getProducts - Started");

      const {
        categoryId,
        category, // For filtering by category name
        sortBy,
        sortOrder = "ASC", // Default value directly in destructuring
        status,
        name, // Add name filter
        page = 1,
        pageSize = 10,
      } = filters;

      const where = {};
      if (categoryId) where.category_id = categoryId;
      if (status) where.status = status;
      if (name) where.name = { [Op.iLike]: `%${name}%` }; // Use `Op.iLike` for case-insensitive search

      // Handle category name filtering
      const includeCategory = {};
      if (category) {
        includeCategory.where = { name: { [Op.iLike]: `%${category}%` } }; // Use `Op.iLike` for case-insensitive search
      }

      const order = [];
      if (sortBy) {
        // Use sortOrder directly
        order.push([sortBy, sortOrder]);
      }

      const products = await Product.findAll({
        where,
        order,
        limit: pageSize,
        offset: (page - 1) * pageSize,
        include: [
          {
            model: Category,
            as: "category", // Ensure this matches the alias in the association
            attributes: ["name"],
            where: includeCategory.where, // Apply category filter here
          },
        ],
      });

      return products;
    } catch (error) {
      console.log("Repository - Product: getProducts - Error:", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      console.log("Repository - Product: getProductById - Started");
      return await Product.findByPk(id, {
        include: [
          {
            model: Category,
            as: "category", // Ensure this matches the alias in associations
            attributes: ["name"], // Specify the attributes you want to include
          },
        ],
      });
    } catch (error) {
      console.log("Repository - Product: getProductById - Error:", error);
      throw error;
    }
  }

  async updateProduct(id, payload) {
    try {
      console.log("Repository - Product: updateProduct - Started");
      return await Product.update(payload, { where: { product_id: id } });
    } catch (error) {
      console.log("Repository - Product: updateProduct - Error:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      console.log("Repository - Product: deleteProduct - Started");
      const product = await Product.findByPk(id);
      if (!product) return null;
      await product.destroy();
      return true;
    } catch (error) {
      console.log("Repository - Product: deleteProduct - Error:", error);
      throw error;
    }
  }
}

export default ProductRepo;
