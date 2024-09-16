import CategoryService from "../../../../src/restAPI/services/categoryService.js";
import CategoryRepository from "../../../../src/restAPI/repositories/categoryRepo.js";
import {
  ValidationError,
  NotFoundError,
} from "../../../../src/common/utils/error.js"; // Import errors for assertion

describe("CategoryService", () => {
  let categoryService;
  let categoryRepositoryMock;

  beforeEach(() => {
    categoryRepositoryMock = {
      createCategory: jest.fn(),
      getCategories: jest.fn(),
      getCategoryById: jest.fn(),
      updateCategory: jest.fn(),
      deleteCategory: jest.fn(),
      checkExistance: jest.fn(), // Mock existence check
    };
    categoryService = new CategoryService(categoryRepositoryMock);
  });

  test("getCategoryById failure", async () => {
    categoryRepositoryMock.getCategoryById.mockResolvedValue(null); // Simulate not found

    await expect(categoryService.getCategoryById(999)).rejects.toThrow(
      NotFoundError
    );
    await expect(categoryService.getCategoryById(999)).rejects.toThrow(
      "Category not found"
    );
  });
});
