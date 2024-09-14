// productModel.js
import { DataTypes } from "sequelize";
import db from "../config/database.js";
const { sequelize } = db;

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
      model: 'Categories', // Ensure this matches the model name in the DB
      key: "id",
    },
    onDelete: "cascade",
  },
});

export default Product;
