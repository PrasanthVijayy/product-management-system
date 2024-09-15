import { UnauthorizedError } from "../utils/error.js";
import User from "../../common/models/userModel.js"; // Ensure this is imported correctly

const roleAuthorization = (requiredRoles) => {
  return async (req, res, next) => {
    try {
      // Extract user ID from request (assuming it was set in authMiddleware)
      const { uid } = req.user;
      if (!uid) {
        console.log("No user ID found in request");
        throw new UnauthorizedError("User ID not found");
      }

      // Fetch user data from the database
      const user = await User.findOne({
        where: { uid },
      });

      if (!user) {
        console.log("User not found in the database");
        throw new UnauthorizedError("User not found");
      }

      // Check the user's role (Ensure role field exists in the database)
      // console.log("User role:", user.role);
      // console.log("Required roles:", requiredRoles);

      // If requiredRoles is an array, check if the user's role matches any of the roles
      if (!requiredRoles.includes(user.role)) {
        console.log(`User role "${user.role}" does not match the required role`);
        throw new UnauthorizedError("Insufficient permissions");
      }

      // User has the required role, proceed to the next middleware
      next();
    } catch (error) {
      console.error("Role-based authorization error:", error);
      res.status(403).json({ message: "Insufficient permissions" }); // Send 403 Forbidden response to client
    }
  };
};

export default roleAuthorization;
