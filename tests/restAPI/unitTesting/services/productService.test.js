import ProductService from "../../../../src/restAPI/services/productService.js";
import ProductRepo from "../../../../src/restAPI/repositories/productRepo.js";
import {
  ConflictError,
  NotFoundError,
} from "../../../../src/common/utils/error.js";

jest.mock("../../../../src/restAPI/repositories/productRepo.js");

describe("ProductService", () => {
  let service;

  beforeEach(() => {
    service = new ProductService();
  });

  describe("createProduct", () => {
    it("should create a product and return it", async () => {
      const payload = { name: "Test Product", price: 100, categoryId: "1" };

      ProductRepo.prototype.createProduct.mockResolvedValue({
        id: "uuidv4()",
        ...payload,
      });

      const result = await service.createProduct(payload);

      expect(result).toEqual({
        id: "uuidv4()",
        ...payload,
      });
    });
  });

  describe("updateProduct", () => {
    it("should update a product", async () => {
      const id = "1";
      const payload = { name: "Updated Product", price: 150 };

      ProductRepo.prototype.updateProduct.mockResolvedValue([1]);

      const result = await service.updateProduct(id, payload);

      expect(result).toEqual([1]);
    });
  });

  describe("deleteProduct", () => {
    it("should delete a product successfully", async () => {
      const id = "1";

      ProductRepo.prototype.deleteProduct.mockResolvedValue(true);

      const result = await service.deleteProduct(id);

      expect(result).toBe(true);
    });

    it("should throw a NotFoundError if product ID does not exist", async () => {
      const id = "1";

      ProductRepo.prototype.deleteProduct.mockResolvedValue(false);

      await expect(service.deleteProduct(id)).rejects.toThrow(NotFoundError);
    });
  });
});
