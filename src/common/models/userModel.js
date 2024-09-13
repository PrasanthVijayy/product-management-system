import { DataTypes } from "sequelize";
import sequelize from "../config/database.js"; // Your Sequelize instance
import Role from "./roleModel.js"; // Import Role model

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  uid: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Role, // Foreign key reference to Role
      key: "id",
    },
  },
});

//relationship
User.belongsTo(Role, {
  foreignKey: "role_id",
  as: "role",
});

export default User;
