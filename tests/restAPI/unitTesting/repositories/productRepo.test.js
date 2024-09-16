import ProductsRepo from "../../../../src/restAPI/repositories/productRepo.js";
import { Product, Category } from "../../../../src/common/models/index.js";
import {
  ConflictError,
  NotFoundError,
} from "../../../../src/common/utils/error.js";

// Mock the models
jest.mock("../../../../src/common/models/index.js");

describe("ProductsRepo", () => {
  let productsRepo;

  beforeEach(() => {
    productsRepo = new ProductsRepo();
  });

  describe("createProduct", () => {
    it("should create a product and return it", async () => {
      const payload = { name: "Test Product", category_id: 1 };

      Product.create.mockResolvedValue({ id: 1, ...payload });

      const result = await productsRepo.createProduct(payload);

      expect(Product.create).toHaveBeenCalledWith(payload);
      expect(result).toEqual({ id: 1, ...payload });
    });
  });

  describe("getProducts", () => {
    it("should return products with pagination", async () => {
      const params = { page: 1, pageSize: 10 };

      const mockProducts = [
        { id: 1, name: "Test Product", category: { name: "Test Category" } },
      ];

      Product.findAll.mockResolvedValue(mockProducts);

      const result = await productsRepo.getProducts(params);

      expect(Product.findAll).toHaveBeenCalledWith({
        where: {},
        order: [],
        limit: params.pageSize,
        offset: (params.page - 1) * params.pageSize,
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["name"],
            where: undefined,
          },
        ],
      });

      expect(result).toEqual(mockProducts);
    });
  });

  describe("getProductById", () => {
    it("should return a product by ID", async () => {
      const id = 1;

      const mockProduct = {
        id: 1,
        name: "Test Product",
        category: { name: "Test Category" },
      };

      Product.findByPk.mockResolvedValue(mockProduct);

      const result = await productsRepo.getProductById(id);

      expect(Product.findByPk).toHaveBeenCalledWith(id, {
        include: [
          {
            model: Category,
            as: "category",
            attributes: ["name"],
          },
        ],
      });

      expect(result).toEqual(mockProduct);
    });

    it("should throw a NotFoundError if product ID does not exist", async () => {
      const id = 1;
      const payload = { name: "Updated Product" };

      // Mock update to simulate no rows affected
      Product.update.mockResolvedValue([0]); // Simulate no rows updated

      // Ensure the function call rejects with the expected error
      await expect(productsRepo.updateProduct(id, payload)).rejects.toThrow(
        new NotFoundError("Invalid product ID.")
      );
    });
  });

  describe("updateProduct", () => {
    it("should update a product", async () => {
      const id = 1;
      const payload = { name: "Updated Product" };
      Product.update.mockResolvedValue([1]);
      const result = await productsRepo.updateProduct(id, payload);
      expect(Product.update).toHaveBeenCalledWith(payload, {
        where: { product_id: id },
      });
      expect(result).toBe(1);
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product successfully", async () => {
      const id = 1; // Changed to number for consistency

      // Mock the product instance
      const mockProduct = { id, destroy: jest.fn() };
      Product.findByPk.mockResolvedValue(mockProduct); // Mock the findByPk method to return the mock product

      const result = await productsRepo.deleteProduct(id);

      expect(Product.findByPk).toHaveBeenCalledWith(id);
      expect(mockProduct.destroy).toHaveBeenCalled();
      expect(result).toBe(`Product deleted successfully`);
    });

    it("should throw a NotFoundError if product ID does not exist", async () => {
      const id = 1;

      Product.findByPk.mockResolvedValue(null);

      await expect(productsRepo.deleteProduct(id)).rejects.toThrow(
        new NotFoundError(`Product not found`)
      );
    });
  });
});
