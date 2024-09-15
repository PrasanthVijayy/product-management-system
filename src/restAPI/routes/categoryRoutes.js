import express from "express";
import CategoryController from "../controllers/categoryController.js";
import authMiddleware from "../../common/middleware/authMiddleware.js";
//Role authorization middleware
import roleAuthorization from "../../common/middleware/roleAuthorizationMiddleware.js";
//To stop brute force attack.
import apiLimiter from "../../common/middleware/rateLimiter.js";

const categoryController = new CategoryController();

const categoryRoutes = (app) => {
  const router = express.Router();
  app.use("/api/v1/category", router);

  router.post("/create", authMiddleware, roleAuthorization(["admin"]), categoryController.createCategory);
  router.get("/list", authMiddleware, apiLimiter(10), categoryController.getCategories); //To avoid brute force attacks
  router.get("/list/:id", authMiddleware, apiLimiter(10), categoryController.getCategoryById); //To avoid brute force attacks
  router.put("/update/:id", authMiddleware, roleAuthorization(["admin"]), categoryController.updateCategory);
  router.delete("/delete/:id", authMiddleware, roleAuthorization(["admin"]), categoryController.deleteCategory);
};

export default categoryRoutes;
