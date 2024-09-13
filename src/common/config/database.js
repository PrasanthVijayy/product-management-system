import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000, //Max waiting time for connection pool
      idle: 10000,
    },
  }
);

//Establish a connection to the database
const connectDB = () => {
  return new Promise((resolve, reject) => {
    sequelize
      .authenticate()
      .then(() => {
        console.log("Connected to databasesuccessfully.");
        resolve();
      })
      .catch((err) => {
        console.error("Unable to connect to the database:", err);
        reject();
      });
  });
};

export default connectDB;
