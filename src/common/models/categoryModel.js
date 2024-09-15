import { DataTypes } from "sequelize";
import db from "../config/database.js";

const Category = db.sequelize.define("Category", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Category will be unique.
  },
  createdBy: {
    type: DataTypes.UUID,
    allowNull: false,
  },
});

export default Category;
