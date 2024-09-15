import productService from "../services/productService.js";
import { BadRequestError, NotFoundError } from "../../common/utils/error.js";

class ProductController {
  constructor() {
    this.productService = new productService();
  }

  createProduct = async (req, res, next) => {
    try {
      console.log("Controller - Product: createProduct - Started");
      const { name, price, stock_quantity, category } = req.body;
      const { uid } = req.user;

      let missingFields = [];
      //description field optional
      if (!name) missingFields.push("name");
      if (!price) missingFields.push("price");
      if (!stock_quantity) missingFields.push("stock_quantity");
      if (!category) missingFields.push("category");

      if (missingFields.length > 0)
        throw new BadRequestError(
          `Missing fields: ${missingFields.join(", ")}`
        );

      // Get category ID from category name
      const categoryId = await this.productService.getCategoryIdByName(
        category
      );

      const payload = {
        ...req.body,
        category_id: categoryId, // Set the category ID to store in the db
        createdBy: uid,
      };

      const newProduct = await this.productService.createProduct(payload);

      res.status(201).json({
        message: "Product created successfully",
        newProduct,
      });
    } catch (error) {
      console.log("Controller - Product: createProduct - Error");
      next(error);
    }
  };

  getProducts = async (req, res, next) => {
    try {
      console.log("Controller - Product: getProducts - Started");

      // Extract filters from query parameters
      const filters = {
        categoryId: req.query.categoryId,
        sortBy: req.query.sortBy,
        sortOrder: req.query.sortOrder,
        status: req.query.status,
        page: parseInt(req.query.page, 10) || 1,
        pageSize: parseInt(req.query.pageSize, 10) || 10,
      };

      const products = await this.productService.getProducts(filters);
      res.status(200).json(products);
    } catch (error) {
      console.log("Controller - Product: getProducts - Error", error);
      next(error);
    }
  };

  getProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await this.productService.getProductById(id);

      if (!product) throw new NotFoundError("Product not found");

      res.status(200).json({ product });
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, stock_quantity, price, status, category } = req.body;

      if (stock_quantity <= 0)
        throw new BadRequestError("Stock quantity cannot be negative and zero");

      if (!["inStock", "outStock"].includes(status)) {
        throw new BadRequestError("Stock status must be inStock or outStock");
      }
      const payload = req.body;
      console.log("payload", payload);

      const updatedProduct = await this.productService.updateProduct(
        id,
        payload
      );
      res.status(200).json({
        message: "Product updated successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      const { id } = req.params;
      await this.productService.deleteProduct(id);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
      next(error);
    }
  };
}

export default ProductController;
