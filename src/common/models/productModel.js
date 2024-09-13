import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";
import Category from "./categoryModel.js";

const Product = sequelize.define("Product", {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  stock_quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Category,
      key: "id",
    },
    onDelete: "cascade", // delete related products when category is deleted
  },
});

//relationship
Product.belongsTo(Category, {
  foreignKey: "category_id",
  as: "category",
});

export default Product;
