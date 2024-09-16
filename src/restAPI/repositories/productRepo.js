import { Product, Category } from "../../common/models/index.js";
import { Op } from "sequelize";
import { NotFoundError } from "../../common/utils/error.js";

class ProductRepo {

  async checkExistance(field, value) {
    try {
      console.log("Repository - Product: checkExistance - Initiated");
      const product = await Product.findOne({ where: { [field]: value } });
      return product;
    } catch (error) {
      console.log("Repository - Product: checkExistance - Error");
      throw error;
    }
  }
  async createProduct(payload) {
    try {
      console.log("Repository - Product: create - Initiated");
      const product = await Product.create(payload);
      
      return product;
    } catch (error) {
      console.log("Repository - Product: create - Error");
      throw error;
    }
  }

  async getProducts(filters) {
    try {
      console.log("Repository - Product: getProducts - Started");

      const {
        categoryId,
        category, // For filtering by category name
        sortBy,
        sortOrder = "ASC",
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
            as: "category",
            attributes: ["name"],
            where: includeCategory.where,
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
            as: "category",
            attributes: ["name"],
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
      const [affectedRows] = await Product.update(payload, {
        where: { product_id: id },
      });

      if (affectedRows === 0) {
        throw new NotFoundError("Invalid product ID.");
      }

      return affectedRows;
    } catch (error) {
      console.log("Repository - Product: updateProduct - Error:", error);
      throw error;
    }
  }

  async deleteProduct(id) {
    try {
      console.log("Repository - Product: deleteProduct - Started");
      const product = await Product.findByPk(id);
      if (!product) throw new NotFoundError("Product not found");
      await product.destroy();
      return `Product deleted successfully`;
    } catch (error) {
      console.log("Repository - Product: deleteProduct - Error:", error);
      throw error;
    }
  }
}

export default ProductRepo;
