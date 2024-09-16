import { Request, Response, NextFunction } from "express";
import CategoryController from "../../../../src/restAPI/controllers/categoryController.js";
import categoryService from "../../../../src/restAPI/services/categoryService.js";
import {
  BadRequestError,
  NotFoundError,
} from "../../../../src/common/utils/error.js";

jest.mock("../../../../src/restAPI/services/categoryService.js");

describe("CategoryController", () => {
  let categoryController;

  beforeEach(() => {
    categoryController = new CategoryController();
  });

  describe("createCategory", () => {
    it("should create a category successfully", async () => {
      const req = {
        body: { name: "Test Category" },
        user: { uid: "test-uid" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      categoryService.prototype.createCategory.mockResolvedValue({
        id: 1,
        name: "Test Category",
        createdBy: "test-uid",
      });

      await categoryController.createCategory(req, res, next);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Category created successfully",
        newCategory: {
          id: 1,
          name: "Test Category",
          createdBy: "test-uid",
        },
      });
    });

    it("should return a BadRequestError if name is missing", async () => {
      const req = {
        body: {},
        user: { uid: "test-uid" },
      };
      const res = {};
      const next = jest.fn();

      await categoryController.createCategory(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new BadRequestError("Category name is required")
      );
    });
  });

  describe("getCategories", () => {
    it("should return a list of categories with pagination", async () => {
      const req = {
        query: { page: "1", limit: "10" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      categoryService.prototype.getCategories.mockResolvedValue({
        categories: [{ id: 1, name: "Test Category" }],
        total: 1,
      });

      await categoryController.getCategories(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        categories: [{ id: 1, name: "Test Category" }],
        total: 1,
      });
    });
  });

  describe("getCategoryById", () => {
    it("should return a category by ID", async () => {
      const req = {
        params: { id: "1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      categoryService.prototype.getCategoryById.mockResolvedValue({
        id: 1,
        name: "Test Category",
      });

      await categoryController.getCategoryById(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        category: { id: 1, name: "Test Category" },
      });
    });

    it("should return a NotFoundError if category is not found", async () => {
      const req = {
        params: { id: "1" },
      };
      const res = {};
      const next = jest.fn();

      categoryService.prototype.getCategoryById.mockResolvedValue(null);

      await categoryController.getCategoryById(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new NotFoundError("Category not found")
      );
    });
  });

  describe("updateCategory", () => {
    it("should update a category successfully", async () => {
      const req = {
        params: { id: "1" },
        body: { name: "Updated Category" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      categoryService.prototype.updateCategory.mockResolvedValue({
        id: 1,
        name: "Updated Category",
      });

      await categoryController.updateCategory(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Category updated successfully",
      });
    });

    it("should return a BadRequestError if name is missing", async () => {
      const req = {
        params: { id: "1" },
        body: {},
      };
      const res = {};
      const next = jest.fn();

      await categoryController.updateCategory(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new BadRequestError("Category name is required")
      );
    });
  });

  describe("deleteCategory", () => {
    it("should delete a category successfully", async () => {
      const req = {
        params: { id: "1" },
      };
      const res = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
      const next = jest.fn();

      categoryService.prototype.deleteCategory.mockResolvedValue(true);

      await categoryController.deleteCategory(req, res, next);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Category deleted successfully",
      });
    });

    it("should return a NotFoundError if category is not found", async () => {
      const req = {
        params: { id: "1" },
      };
      const res = {};
      const next = jest.fn();

      categoryService.prototype.deleteCategory.mockResolvedValue(null);

      await categoryController.deleteCategory(req, res, next);

      expect(next).toHaveBeenCalledWith(
        new NotFoundError("Category not found")
      );
    });
  });
});
