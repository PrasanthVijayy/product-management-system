// models/index.js
import db from "../config/database.js";
import User from "./userModel.js";
import Role from "./roleModel.js";
import Product from "./productModel.js";
import Category from "./categoryModel.js";

// Set up associations
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

export { User, Role, Product, Category };
