// models/index.js
import db from "../config/database.js";
import Product from "./productModel.js";
import Category from "./categoryModel.js";

// Set up associations
Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

export { Product, Category };
