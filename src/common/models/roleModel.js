import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Your Sequelize instance

const Role = sequelize.define("Role", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
});

// relationship
Role.hasMany(User, {
  foreignKey: "role_id",
  as: "users",
});

export default Role;
