import express from "express";
import ProductController from "../controllers/productController.js";
import authMiddleware from "../../common/middleware/authMiddleware.js";
//Role authorization middleware
import roleAuthorization from "../../common/middleware/roleAuthorizationMiddleware.js";
//To stop brute force attacks.
import apiLimiter from "../../common/middleware/rateLimiter.js";

const productController = new ProductController();  

const productRoutes = (app) => {
  const router = express.Router();
  app.use("/api/v1/product/", router);

  router.post("/create", authMiddleware, roleAuthorization(["admin"]), productController.createProduct);
  router.get("/list", authMiddleware, apiLimiter(50), productController.getProducts); //To avoid brute force attacks
  router.get("/list/:id", authMiddleware, apiLimiter(10), productController.getProduct); //To avoid brute force attacks
  router.put("/update/:id", authMiddleware, roleAuthorization(["admin"]), productController.updateProduct);
  router.delete("/delete/:id", authMiddleware, roleAuthorization(["admin"]), productController.deleteProduct);
};

export default productRoutes;