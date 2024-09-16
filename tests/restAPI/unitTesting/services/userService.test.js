import CategoryService from "../../../../src/restAPI/services/categoryService.js"; // Corrected import
import categoryRepo from "../../../../src/restAPI/repositories/categoryRepo.js";
import {
  ConflictError,
  NotFoundError,
} from "../../../../src/common/utils/error.js";

jest.mock("../../../../src/restAPI/repositories/categoryRepo.js");

describe("CategoryService", () => {
  let service;

  beforeEach(() => {
    service = new CategoryService(categoryRepo); // Corrected constructor
  });

  describe("createCategory", () => {
    it("should create a category and return it", async () => {
      const payload = { name: "Test Category", createdBy: "test-uid" };

      categoryRepo.prototype.checkExistance.mockResolvedValue(null);
      categoryRepo.prototype.createCategory.mockResolvedValue({
        id: 1,
        ...payload,
      });

      const result = await service.createCategory(payload);

      expect(result).toEqual({
        id: 1,
        ...payload,
      });
    });

    it("should throw a ConflictError if category already exists", async () => {
      categoryRepo.prototype.checkExistance.mockResolvedValue(true);

      await expect(
        service.createCategory({ name: "Test Category" })
      ).rejects.toThrow(ConflictError);
    });
  });

  describe("getCategories", () => {
    it("should return categories with pagination", async () => {
      const params = { page: 1, limit: 10 };

      categoryRepo.prototype.getCategories.mockResolvedValue({
        categories: [{ id: 1, name: "Test Category" }],
        total: 1,
      });

      const result = await service.getCategories(params);

      expect(result).toEqual({
        categories: [{ id: 1, name: "Test Category" }],
        total: 1,
      });
    });
  });

  describe("getCategoryById", () => {
    it("should return a category by ID", async () => {
      const id = "1";

      categoryRepo.prototype.getCategoryById.mockResolvedValue({
        id: 1,
        name: "Test Category",
      });

      const result = await service.getCategoryById(id);

      expect(result).toEqual({
        id: 1,
        name: "Test Category",
      });
    });

    it("should throw a NotFoundError if category is not found", async () => {
      const id = "1";

      categoryRepo.prototype.getCategoryById.mockResolvedValue(null);

      await expect(service.getCategoryById(id)).rejects.toThrow(NotFoundError);
    });
});

  describe("updateCategory", () => {
    it("should update a category", async () => {
      const id = "1";
      const payload = { name: "Updated Category" };

      categoryRepo.prototype.checkExistance.mockResolvedValue(true);
      categoryRepo.prototype.updateCategory.mockResolvedValue([1]);

      const result = await service.updateCategory(id, payload);

      expect(result).toEqual([1]);
    });

    it("should throw a NotFoundError if category ID does not exist", async () => {
      const id = "1";
      const payload = { name: "Updated Category" };

      categoryRepo.prototype.checkExistance.mockResolvedValue(false);

      await expect(service.updateCategory(id, payload)).rejects.toThrow(
        NotFoundError
      );
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category successfully", async () => {
      const id = "1";

      categoryRepo.prototype.deleteCategory.mockResolvedValue(true);

      const result = await service.deleteCategory(id);

      expect(result).toBe(true);
    });

    it("should throw a NotFoundError if category ID does not exist", async () => {
      const id = "1";

      categoryRepo.prototype.deleteCategory.mockResolvedValue(false);

      await expect(service.deleteCategory(id)).rejects.toThrow(NotFoundError);
    });
  });
});
