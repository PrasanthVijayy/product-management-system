import Category from "../../common/models/categoryModel.js";

class categoryRepo {
  async createCategory(payload) {
    try {
      console.log("Repository - Category: create - Initiated");
      const newCategory = await Category.create(payload);
      return newCategory;
    } catch (error) {
      console.log("Repository - Category: create - Error");
      throw error;
    }
  }

  async checkExistance(field, value) {
    try {
      console.log("Repository - Category: checkExistance - Initiated");
      let whereCondition = {};
      whereCondition[field] = value;
      const category = await Category.findOne({ where: whereCondition });
      return category;
    } catch (error) {
      console.log("Repository - Category: checkExistance - Error");
      throw error;
    }
  }

  async getCategories({ limit, offset }) {
    try {
      console.log("Repository - Category: findAll - Initiated");

      const [categories, total] = await Promise.all([
        Category.findAll({
          limit: limit,
          offset: offset,
        }),
        Category.count(), // Get total count
      ]);

      return { categories, total };
    } catch (error) {
      console.log("Repository - Category: findAll - Error");
      throw error;
    }
  }

  async getCategoryById(id) {
    try {
      console.log("Repository - Category: findById - Initiated");
      const category = await Category.findByPk(id);
      return category;
    } catch (error) {
      console.log("Repository - Category: findById - Error");
      throw error;
    }
  }

  async updateCategory(id, payload) {
    try {
      console.log("Repository - Category: update - Initiated");
      const category = await Category.update(payload, { where: { id: id } });

      return category;
    } catch (error) {
      console.log("Repository - Category: update - Error");
      throw error;
    }
  }

  async deleteCategory(id) {
    try {
      console.log("Repository - Category: delete - Initiated");
      const category = await Category.findByPk(id);
      if (!category) return null;

      await category.destroy();
      return true;
    } catch (error) {
      console.log("Repository - Category: delete - Error");
      throw error;
    }
  }
}

export default categoryRepo;
