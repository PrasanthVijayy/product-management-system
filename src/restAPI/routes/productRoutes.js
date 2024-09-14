import express from "express";
import productController from "../controllers/productController.js";
import authMiddleware from "../../common/middleware/authMiddleware.js";

const productRoutes = (app) => {
  const router = express.Router();
  app.use("/api/v1/product/", router);

  router.post("/create", authMiddleware, productController.createProduct);
  router.get("/list", authMiddleware, productController.getProducts);
  router.get("/list/:id", authMiddleware, productController.getProduct); 
  router.put("/update/:id", authMiddleware, productController.updateProduct);
  router.delete("/delete/:id", authMiddleware, productController.deleteProduct);
};

export default productRoutes;