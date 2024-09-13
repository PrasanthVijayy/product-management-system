import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Your Sequelize instance

const Category = sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  description: {
    type: DataTypes.TEXT,
  },
});

//relationship
Category.hasMany(Product, {
  foreignKey: "category_id",
  as: "products",
});

export default Category;
