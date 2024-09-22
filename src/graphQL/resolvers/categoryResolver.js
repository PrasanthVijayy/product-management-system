import CategoryService from "../../restAPI/services/categoryService.js"; // Reuse the service
import { BadRequestError, NotFoundError } from "../../common/utils/error.js";

const categoryService = new CategoryService();

const resolvers = {
  Query: {
    getCategories: async (_, { page = 1, limit = 10 }) => {
      try {
        const { total, categories } = await categoryService.getCategories({
          page,
          limit,
        });
        return { total, categories };
      } catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error(error.message);
      }
    },

    getCategoryById: async (_, { id }) => {
      try {
        if (!id) throw new BadRequestError("Category ID is required");
        const category = await categoryService.getCategoryById(id);
        if (!category) throw new NotFoundError("Category not found");
        return { category };
      } catch (error) {
        console.error("Error fetching category by ID:", error);
        throw new Error(error.message);
      }
    },
  },

  Mutation: {
    createCategory: async (_, { input }, { user }) => {
      try {
        if (!input.name) throw new BadRequestError("Category name is required");

        const payload = { name: input.name, createdBy: user.uid };
        const newCategory = await categoryService.createCategory(payload);
        return {
          message: "Category created successfully",
          category: newCategory,
        };
      } catch (error) {
        console.error("Error creating category:", error);
        throw new Error(error.message);
      }
    },

    updateCategory: async (_, { id, input }) => {
      try {
        if (!id) throw new BadRequestError("Category ID is required");
        if (!input.name) throw new BadRequestError("Category name is required");

        const updatedCategory = await categoryService.updateCategory(id, input);
        return {
          message: "Category updated successfully",
          category: updatedCategory,
        };
      } catch (error) {
        console.error("Error updating category:", error);
        throw new Error(error.message);
      }
    },

    deleteCategory: async (_, { id }) => {
      try {
        if (!id) throw new BadRequestError("Category ID is required");

        const deletedCategory = await categoryService.deleteCategory(id);
        if (!deletedCategory) throw new NotFoundError("Category not found");

        return {
          message: "Category deleted successfully",
        };
      } catch (error) {
        console.error("Error deleting category:", error);
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
