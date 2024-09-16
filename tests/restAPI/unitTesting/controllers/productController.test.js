import ProductController from "../../../../src/restAPI/controllers/productController.js";
import ProductService from "../../../../src/restAPI/services/productService.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../../../src/common/utils/error.js";

// Mocking the service
jest.mock("../../../../src/restAPI/services/productService.js");

describe("ProductController", () => {
  let req, res, next, productService, productController;

  beforeEach(() => {
    productService = new ProductService();
    productController = new ProductController();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    next = jest.fn();
  });

  describe("createProduct", () => {
    it("should handle service error", async () => {
      req = {
        body: {
          name: "Test Product",
          price: 100,
          categoryId: "1",
        },
      };
      productService.createProduct.mockRejectedValue(
        new Error("Internal Server Error")
      );

      await productController.createProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  describe("updateProduct", () => {
    it("should handle not found error", async () => {
      req = {
        params: { id: "1" },
        body: { name: "Updated Product", price: 150 },
      };
      productService.updateProduct.mockResolvedValue([0]);

      await productController.updateProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    });
  });

  describe("deleteProduct", () => {
    it("should handle not found error", async () => {
      req = { params: { id: "1" } };
      productService.deleteProduct.mockResolvedValue(false);

      await productController.deleteProduct(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(NotFoundError));
    });
  });
});
