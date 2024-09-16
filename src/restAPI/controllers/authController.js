import UserService from "../services/authService.js";
import { BadRequestError } from "../../common/utils/error.js";
import { v4 as uuidv4 } from "uuid";
import constants from "../../common/utils/constants.js";

class UserController {
  constructor() {
    this.userService = new UserService();
  }

  // Register user response
  register = async (req, res, next) => {
    try {
      console.log("Controller - Auth: register - Started");
      const { username, email, password, role } = req.body;

      let missingFields = [];
      if (!username) missingFields.push("username");
      if (!email) missingFields.push("email");
      if (!password) missingFields.push("password");
      if (!role) missingFields.push("role");

      if (missingFields.length > 0)
        throw new BadRequestError(
          `Missing fields: ${missingFields.join(", ")}`
        );

      if (username) {
        const validUsername = /^[a-zA-Z0-9]+$/;
        if (!validUsername.test(username)) {
          throw new BadRequestError(
            "Username must only have alphanumeric characters."
          );
        }
      }

      if (email) {
        const validEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!validEmail.test(email)) {
          throw new BadRequestError("Invalid email format.");
        }
      }

      if (!["admin", "user"].includes(role)) {
        throw new BadRequestError("Role must be 'user' or 'admin'.");
      }

      const payload = req.body;
      payload.uid = uuidv4();
      const user = await this.userService.register(payload);
      console.log("Controller - Auth: register - Ended");
      res.status(201).json(user);
    } catch (error) {
      console.log("Controller - Auth: register - Error");
      next(error);
    }
  };

  // Login user
  login = async (req, res, next) => {
    try {
      console.log("Controller - Auth: login - Started");
      const { email, password } = req.body;

      if (!email) throw new BadRequestError("Missing email field");
      if (!password) throw new BadRequestError("Missing password field");

      const payload = { email, password };
      console.log("payload", payload);
      const user = await this.userService.login(payload);

      console.log("Controller - Auth: login - Ended");
      res.cookie("access_token", user.access_token, {
        httpOnly: true, // Prevent JavaScript access
        secure: process.env.NODE_ENV === "PRODUCTION", // Use 'true' if you have HTTPS
        sameSite: "Strict", // Adjust as needed
        maxAge: constants.TOKENS.ACCESS_TOKEN_EXPIRY * 1000, // Token expiration in milliseconds
      });
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.log("Controller - Auth: login - Error");
      next(error);
    }
  };
}

export default UserController;
