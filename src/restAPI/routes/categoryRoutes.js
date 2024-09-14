import express from "express";
import categoryController from "../controllers/categoryController.js";
import authMiddleware from "../../common/middleware/authMiddleware.js";

const categoryRoutes = (app) => {
  const router = express.Router();
  app.use("/api/v1/category", router);

  router.post("/create", authMiddleware, categoryController.createCategory);
  router.get("/list", authMiddleware, categoryController.getCategories);
  router.get("/list/:id", authMiddleware, categoryController.getCategory); 
  router.put("/update/:id", authMiddleware, categoryController.updateCategory);
  router.delete("/delete/:id", authMiddleware, categoryController.deleteCategory);
};

export default categoryRoutes;
