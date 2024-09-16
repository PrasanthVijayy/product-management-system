import express from "express";
import ProductController from "../controllers/productController.js";
import authMiddleware from "../../common/middleware/authMiddleware.js";
//Role authorization middleware
import roleAuthorization from "../../common/middleware/roleAuthorizationMiddleware.js";
//To stop brute force attacks.
import apiLimiter from "../../common/middleware/rateLimiter.js";

const productController = new ProductController();

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API endpoints for category management
 */

const productRoutes = (app) => {
  const router = express.Router();
  app.use("/api/v1/product/", router);

  /**
   * @swagger
   * /api/v1/product/create:
   *   post:
   *     summary: Create a new product
   *     description: Creates a new product. Requires admin role.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Products
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Name of the product
   *                 example: Smartphone
   *               price:
   *                 type: number
   *                 format: float
   *                 description: Price of the product
   *                 example: 699.99
   *               categoryId:
   *                 type: integer
   *                 description: ID of the category the product belongs to
   *                 example: 1
   *     responses:
   *       201:
   *         description: Product created successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */
  router.post("/create", authMiddleware, roleAuthorization(["admin"]), productController.createProduct);

  /**
   * @swagger
   * /api/v1/product/list:
   *   get:
   *     summary: Get list of products
   *     description: Retrieves a list of all products. Rate limited to 50 requests per minute.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Products
   *     responses:
   *       200:
   *         description: A list of products
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */
  router.get("/list", authMiddleware, apiLimiter(50), productController.getProducts);

  /**
   * @swagger
   * /api/v1/product/list/{id}:
   *   get:
   *     summary: Get a product by ID
   *     description: Retrieves a product by its ID. Rate limited to 10 requests per minute.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: A single product
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Product not found
   */
  router.get("/list/:id", authMiddleware, apiLimiter(10), productController.getProduct);

  /**
   * @swagger
   * /api/v1/product/update/{id}:
   *   put:
   *     summary: Update a product
   *     description: Updates a product by its ID. Requires admin role.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           example: 1
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Updated name of the product
   *                 example: Smartwatch
   *               price:
   *                 type: number
   *                 format: float
   *                 description: Updated price of the product
   *                 example: 199.99
   *               categoryId:
   *                 type: integer
   *                 description: Updated ID of the category the product belongs to
   *                 example: 2
   *     responses:
   *       200:
   *         description: Product updated successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Product not found
   */
  router.put("/update/:id", authMiddleware, roleAuthorization(["admin"]), productController.updateProduct);

  /**
   * @swagger
   * /api/v1/product/delete/{id}:
   *   delete:
   *     summary: Delete a product
   *     description: Deletes a product by its ID. Requires admin role.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Products
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: Product deleted successfully
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Product not found
   */
  router.delete("/delete/:id", authMiddleware, roleAuthorization(["admin"]), productController.deleteProduct);
};


export default productRoutes;