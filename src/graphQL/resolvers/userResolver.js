import UserService from "../../restAPI/services/authService.js"; // Reuse the service
import {
  BadRequestError,
  UnauthorizedError,
} from "../../common/utils/error.js";
import { v4 as uuidv4 } from "uuid";
import constants from "../../common/utils/constants.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userService = new UserService();

const resolvers = {
  Mutation: {
    register: async (_, { input }) => {
      try {
        const { username, email, password, role } = input;

        // Validate fields
        // if (!username || !email || !password || !role) {
        //   throw new BadRequestError("Missing fields");
        // }

        let missingFields = [];

        if (!username) missingFields.push("username");
        if (!email) missingFields.push("email");
        if (!password) missingFields.push("password");
        if (!role) missingFields.push("role");

        if (missingFields.length > 0) {
          throw new BadRequestError(
            `Missing fields: ${missingFields.join(", ")}`
          );
        }

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
          throw new BadRequestError("Invalid username");
        }

        if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
          throw new BadRequestError("Invalid email");
        }

        if (!["admin", "user"].includes(role)) {
          throw new BadRequestError("Invalid role");
        }

        const payload = {
          uid: uuidv4(),
          username,
          email,
          password: await bcrypt.hash(password, 10),
          role,
        };

        const user = await userService.register(payload);

        // Generate JWT token
        // const tokenPayload = {
        //   uid: user.uid,
        //   email: user.email,
        //   tokenType: "access",
        // };

        // const accessToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
        //   expiresIn: constants.TOKENS.ACCESS_TOKEN_EXPIRY,
        // });

        return {
          message: "User registered successfully",
          userdata: {
            uid: user.uid,
            username: user.username,
            role: user.role,
            accessToken,
          },
        };
      } catch (error) {
        console.error("Error during registration:", error);
        throw new Error(error.message);
      }
    },

    login: async (_, { input }) => {
      try {
        const { email, password } = input;

        if (!email || !password) {
          throw new BadRequestError("Missing email or password");
        }

        const user = await userService.login({ email, password });

        if (!user) {
          throw new UnauthorizedError("Invalid credentials");
        }

        const tokenPayload = {
          uid: user.uid,
          email: user.email,
          tokenType: "access",
        };

        const accessToken = jwt.sign(tokenPayload, process.env.SECRET_KEY, {
          expiresIn: constants.TOKENS.ACCESS_TOKEN_EXPIRY,
        });

        return {
          uid: user.uid,
          username: user.username,
          role: user.role,
          accessToken,
        };
      } catch (error) {
        console.error("Error during login:", error);
        throw new Error(error.message);
      }
    },
  },
};

export default resolvers;
