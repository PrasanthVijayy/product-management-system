import categoryRepo from "../../../../src/restAPI/repositories/categoryRepo.js";
import Category from "../../../../src/common/models/categoryModel.js";

jest.mock("../../../../src/common/models/categoryModel.js");

describe("CategoryRepo", () => {
  let repo;

  beforeEach(() => {
    repo = new categoryRepo();
  });

  describe("createCategory", () => {
    it("should create a category and return it", async () => {
      const payload = { name: "Test Category", createdBy: "test-uid" };

      Category.create.mockResolvedValue({
        id: 1,
        ...payload,
      });

      const result = await repo.createCategory(payload);

      expect(result).toEqual({
        id: 1,
        ...payload,
      });
    });
  });

  describe("getCategoryById", () => {
    it("should return a category by ID", async () => {
      Category.findByPk.mockResolvedValue({ id: 1, name: "Test Category" });

      const result = await repo.getCategoryById(1);

      expect(result).toEqual({
        id: 1,
        name: "Test Category",
      });
    });
  });

  describe("updateCategory", () => {
    it("should update a category", async () => {
      Category.update.mockResolvedValue([1]);

      const result = await repo.updateCategory(1, { name: "Updated Category" });

      expect(result).toEqual([1]);
    });
  });
});
