import express from "express";
import UserController from "../controllers/authController.js";
import authMiddleware  from "../../common/middleware/authMiddleware.js";

const userController = new UserController();
const userRoutes = (app) => {
  const router = express.Router();
  app.use("/api/v1/user", router);

  router.post("/register", userController.register);
  router.post("/login",  userController.login);
};

export default userRoutes;
