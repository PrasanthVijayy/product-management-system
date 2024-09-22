import ProductService from "../../restAPI/services/productService.js";
import CategoryService from "../../restAPI/services/categoryService.js";

const productService = new ProductService();
const categoryService = new CategoryService();

const resolvers = {
  Query: {
    getProduct: async (_, { id }) => {
      return await productService.getProductById(id);
    },
    getProducts: async (_, args) => {
      const products = await productService.getProducts(args);
      return {
        total: products.length,
        products,
      };
    },
  },
  Mutation: {
    createProduct: async (_, { input }, { user }) => {
      const categoryId = await categoryService.getCategoryIdByName(input.category);
      const payload = {
        ...input,
        category_id: categoryId,
        createdBy: user.uid,
      };
      return await productService.createProduct(payload);
    },
    updateProduct: async (_, { id, input }) => {
      if (input.category) {
        const category = await categoryService.getCategoryIdByName(input.category);
        if (!category) throw new Error("Category not found");
        input.category_id = category;
      }
      await productService.updateProduct(id, input);
      return await productService.getProductById(id);
    },
    deleteProduct: async (_, { id }) => {
      await productService.deleteProduct(id);
      return "Product deleted successfully";
    },
  },
};

export default resolvers;
