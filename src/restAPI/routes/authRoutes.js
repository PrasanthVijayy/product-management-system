import express from "express";
import UserController from "../controllers/authController.js";
const userController = new UserController();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API endpoints for user management
 */

const userRoutes = (app) => {
  const router = express.Router();
  app.use("/api/v1/user", router);

  /**
   * @swagger
   * /api/v1/user/register:
   *   post:
   *     tags:
   *       - Users
   *     summary: Register a new user
   *     description: Register a new user with username, email, and password.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *                 example: "newuser"
   *               email:
   *                 type: string
   *                 example: "newuser@example.com"
   *               password:
   *                 type: string
   *                 example: "Password123"
   *     responses:
   *       201:
   *         description: User registered successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "User registered successfully"
   *       400:
   *         description: Bad Request
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Validation error: missing fields or invalid format"
   */

  router.post("/register", userController.register);

  /**
   * @swagger
   * /api/v1/user/login:
   *   post:
   *     tags:
   *       - Users
   *     summary: Login a user
   *     description: Login a user with email and password and receive a JWT token.
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               email:
   *                 type: string
   *                 example: "user@example.com"
   *               password:
   *                 type: string
   *                 example: "Password123"
   *     responses:
   *       200:
   *         description: User logged in successfully
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 token:
   *                   type: string
   *                   example: "jwt-token"
   *       401:
   *         description: Unauthorized
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 message:
   *                   type: string
   *                   example: "Invalid credentials"
   */

  router.post("/login", userController.login);
};

export default userRoutes;
