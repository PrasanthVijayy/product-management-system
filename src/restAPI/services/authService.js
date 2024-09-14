import userRepo from "../repositories/authRepo.js";
import { ConflictError, UnauthorizedError } from "../../common/utils/error.js";
import bcrypt from "bcrypt";
import constants from "../../common/utils/constants.js";
import jwt from "jsonwebtoken";

class UserService {
  constructor() {
    this.userRepo = new userRepo();
  }

  async register(payload) {
    try {
      console.log("Service - Auth: register - Initiated");

      // Check if the email already exists
      if (payload.email) {
        const emailExist = await this.userRepo.checkUser(
          "email",
          payload.email
        );
        if (emailExist) {
          throw new ConflictError("Email already exists");
        }
      }

      // Check if the username already exists
      if (payload.username) {
        const userExist = await this.userRepo.checkUser(
          "username",
          payload.username
        );
        if (userExist) {
          throw new ConflictError("Username already exists");
        }
      }

      if (payload.password) {
        payload.password = await bcrypt.hash(payload.password, 10);
      }
      // If both checks pass, proceed with registration
      const user = await this.userRepo.register(payload);
      return user;
    } catch (error) {
      console.log("Service - Auth: register - Error");
      throw error; // Remove the `new Error(error)` to prevent double-wrapping the error
    }
  }

  async login(payload) {
    try {
      console.log("Service - Auth: login - Initiated");

      // Check user credentials
      const user = await this.userRepo.checkUser("email", payload.email);
      if (!user) {
        throw new UnauthorizedError("Invalid credentials");
      }

      // Verify the password
      const isMatch = await bcrypt.compare(payload.password, user.password);
      if (!isMatch) {
        throw new UnauthorizedError("Invalid password");
      }

      // Define token payload
      const tokenPayload = {
        uid: user.uid,
        email: payload.email,
        tokenType: "access",
      };

      const secretKey = process.env.SECRET_KEY;
      const expiresIn = constants.TOKENS.ACCESS_TOKEN_EXPIRY;

      const accessToken = jwt.sign(tokenPayload, secretKey, { expiresIn });

      console.log("Service - Auth: login - Ended");

      // Return user data and tokens
      return {
        uid: user.uid,
        username: user.username,
        role: user.role,
        access_token: accessToken,
      };
    } catch (error) {
      console.log("Service - Auth: login - Error");
      throw error;
    }
  }
}

export default UserService;
