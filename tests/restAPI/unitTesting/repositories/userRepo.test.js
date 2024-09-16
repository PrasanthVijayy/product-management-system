import UserRepo from "../../../../src/restAPI/repositories/authRepo.js";
import User from "../../../../src/common/models/userModel.js";

// Mocking the model
jest.mock("../../../../src/common/models/userModel.js");

describe("UserRepo", () => {
  let userRepo;

  beforeEach(() => {
    userRepo = new UserRepo();
  });

  describe("checkUser", () => {
    it("should find a user by email", async () => {
      const user = { email: "test@example.com", username: "testuser" };
      User.findOne.mockResolvedValue(user);

      const result = await userRepo.checkUser("email", "test@example.com");

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(result).toEqual(user);
    });

    it("should return null if no user found", async () => {
      User.findOne.mockResolvedValue(null);

      const result = await userRepo.checkUser("email", "unknown@example.com");

      expect(User.findOne).toHaveBeenCalledWith({
        where: { email: "unknown@example.com" },
      });
      expect(result).toBeNull();
    });
  });

  describe("register", () => {
    it("should create a new user", async () => {
      const userData = {
        username: "testuser",
        email: "test@example.com",
        password: "Password123",
      };
      User.create.mockResolvedValue(userData);

      const result = await userRepo.register(userData);

      expect(User.create).toHaveBeenCalledWith(userData);
      expect(result).toEqual(userData);
    });
  });
});
