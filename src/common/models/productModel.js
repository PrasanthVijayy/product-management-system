// productModel.js
import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Product = db.sequelize.define("Product", {
  product_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
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
    references: {
      model: 'Categories',
      key: "id",
    },
    onDelete: "SET NULL", // Set null if category is deleted id is set to null.
    onUpdate: "CASCADE",
  },
  status:{
    type: DataTypes.ENUM('inStock', 'outStock'),
    defaultValue: 'inStock'
  },
  createdBy: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Product;
