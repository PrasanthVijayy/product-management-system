import UserController from "../../../src/restAPI/controllers/authController.js";
import UserService from "../../../src/restAPI/services/authService.js";
import { BadRequestError } from "../../../src/common/utils/error.js";

jest.mock("../../../src/restAPI/services/authService.js");

describe("UserController", () => {
  let req, res, next, userService, userController;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController(userService);

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };

    next = jest.fn();
  });

  describe("register", () => {
    it("should handle missing fields error", async () => {
      req = { body: { username: "", email: "", password: "", role: "" } };

      await userController.register(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    });

  });

  describe("login", () => {
    it("should login successfully and set access_token cookie", async () => {
      try {
        req = { body: { email: "test@example.com", password: "Password123" } };
        const userData = {
          uid: "145a4e1e-c03e-4385-938c-6bbae1cc98d4",
          username: "testuser",
          access_token: "jwt-token",
        };
        userService.login.mockResolvedValue(userData);

        await userController.login(req, res, next);

        expect(userService.login).toHaveBeenCalledWith(req.body);
        expect(res.cookie).toHaveBeenCalledWith(
          "access_token",
          userData.access_token,
          expect.any(Object)
        );
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
          message: "Login successful",
          user: userData,
        });
      } catch (error) {
        next(error);
      }
    });

    it("should handle missing email or password", async () => {
      req = { body: { email: "", password: "" } };

      await userController.login(req, res, next);

      expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
    });

    it("should handle service error", async () => {
      req = { body: { email: "test@example.com", password: "Password123" } };

      userService.login.mockRejectedValue(new Error("Invalid credentials"));

      await userController.login(req, res, next);
      expect(next).toHaveBeenCalledWith(expect.any(Error));
    });
  });
});
