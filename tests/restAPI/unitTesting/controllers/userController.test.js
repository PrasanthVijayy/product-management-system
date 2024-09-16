import UserController from "../../../../src/restAPI/controllers/authController.js";
import UserService from "../../../../src/restAPI/services/authService.js";
import { BadRequestError } from "../../../../src/common/utils/error.js";
import { v4 as uuidv4 } from "uuid";

jest.mock("../../../../src/restAPI/services/authService.js");

jest.mock("../../../../src/common/config/redisClient.js", () => ({
  redisClient: {
    connect: jest.fn().mockResolvedValue(true),
    on: jest.fn(),
    set: jest.fn(),
    get: jest.fn(),
    quit: jest.fn(),
  },
}));

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

describe("UserController", () => {
  let req, res, next, userService, userController;

  beforeEach(() => {
    userService = new UserService();
    userController = new UserController();
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      cookie: jest.fn(),
    };
    next = jest.fn();

    uuidv4.mockReturnValue("145a4e1e-c03e-4385-938c-6bbae1cc98d4"); // Mock UUID generation
  });

  describe("register", () => {
    it("should register a user successfully", async () => {
      try {
        req = {
          body: {
            username: "testuser",
            email: "test@example.com",
            password: "Password123",
            role: "user",
          },
        };
        const uid = "145a4e1e-c03e-4385-938c-6bbae1cc98d4";
        userService.register.mockResolvedValue({ uid, ...req.body });

        await userController.register(req, res, next);

        expect(userService.register).toHaveBeenCalledWith({
          uid,
          ...req.body,
        });
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ uid, ...req.body });
      } catch (error) {
        next(error);
      }
    });

    it("should handle missing fields error", async () => {
      try {
        req = { body: { username: "", email: "", password: "", role: "" } };

        await userController.register(req, res, next);

        // Should not reach here if error is thrown properly
        throw new Error("Test failed: Missing fields error not handled");
      } catch (error) {
        expect(next).toHaveBeenCalledWith(expect.any(BadRequestError));
      }
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
  });
});
