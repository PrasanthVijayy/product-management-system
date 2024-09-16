import express from "express";
import CategoryController from "../controllers/categoryController.js";
import authMiddleware from "../../common/middleware/authMiddleware.js";
//Role authorization middleware
import roleAuthorization from "../../common/middleware/roleAuthorizationMiddleware.js";
//To stop brute force attack.
import apiLimiter from "../../common/middleware/rateLimiter.js";

const categoryController = new CategoryController();

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API endpoints for product management
 */
const categoryRoutes = (app) => {
  const router = express.Router();
  app.use("/api/v1/category", router);

  /**
   * @swagger
   * /api/v1/category/create:
   *   post:
   *     summary: Create a new category
   *     description: Creates a new category. Requires admin role.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Categories
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *                 description: Name of the category
   *                 example: Electronics
   *     responses:
   *       201:
   *         description: Category created successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */
  router.post("/create", authMiddleware, roleAuthorization(["admin"]), categoryController.createCategory);

  /**
   * @swagger
   * /api/v1/category/list:
   *   get:
   *     summary: Get list of categories
   *     description: Retrieves a list of all categories. Rate limited to 10 requests per minute.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Categories
   *     responses:
   *       200:
   *         description: A list of categories
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   */
  router.get("/list", authMiddleware, apiLimiter(10), categoryController.getCategories);

  /**
   * @swagger
   * /api/v1/category/list/{id}:
   *   get:
   *     summary: Get a category by ID
   *     description: Retrieves a category by its ID. Rate limited to 10 requests per minute.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Categories
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *           example: 1
   *     responses:
   *       200:
   *         description: A single category
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Category not found
   */
  router.get("/list/:id", authMiddleware, apiLimiter(10), categoryController.getCategoryById);

  /**
   * @swagger
   * /api/v1/category/update/{id}:
   *   put:
   *     summary: Update a category
   *     description: Updates a category by its ID. Requires admin role.
   *     security:
   *       - bearerAuth: []
   *     tags:
   *       - Categories
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
   *                 description: Updated name of the category
   *                 example: Home Appliances
   *     responses:
   *       200:
   *         description: Category updated successfully
   *       400:
   *         description: Bad request
   *       401:
   *         description: Unauthorized
   *       403:
   *         description: Forbidden
   *       404:
   *         description: Category not found
   */
  router.put("/update/:id", authMiddleware, roleAuthorization(["admin"]), categoryController.updateCategory);
/**
 * @swagger
 * /api/v1/category/delete/{id}:
 *   delete:
 *     summary: Delete a category
 *     description: Deletes a category by its ID. Requires admin role.
 *     security:
 *       - bearerAuth: []
 *     tags:
 *       - Categories
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 *       404:
 *         description: Category not found
 */
router.delete("/delete/:id", authMiddleware, roleAuthorization(["admin"]), categoryController.deleteCategory);
};


export default categoryRoutes;
