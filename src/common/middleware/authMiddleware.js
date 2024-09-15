import jwt from "jsonwebtoken";
import {
  UnauthorizedError,
  InternalServerError,
  NotFoundError,
} from "../utils/error.js";
import User from "../../common/models/userModel.js"; // Ensure this is imported correctly
import constants from "../../common/utils/constants.js"; // Ensure this is imported correctly

const authMiddleware = async (req, res, next) => {
  try {
    // Extract token from cookies
    const token = req.cookies.access_token;

    if (!token) {
      throw new UnauthorizedError("No token provided");
    }

    // Verify the access token
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          const refreshToken = req.cookies.refresh_token;
          if (!refreshToken) {
            throw new UnauthorizedError("No refresh token provided");
          }

          try {
            const decodedRefreshToken = jwt.verify(
              refreshToken,
              process.env.REFRESH_TOKEN_SECRET
            );

            const newAccessToken = jwt.sign(
              { uid: decodedRefreshToken.uid, role: decodedRefreshToken.role },
              process.env.SECRET_KEY,
              { expiresIn: constants.TOKENS.ACCESS_TOKEN_EXPIRY }
            );

            res.cookie("access_token", newAccessToken, {
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
            });

            // Overwrite decoded with the refresh token payload
            decoded = decodedRefreshToken;
          } catch (refreshTokenError) {
            throw new UnauthorizedError(
              "Unauthorized: Refresh token invalid or expired"
            );
          }
        } else {
          throw new UnauthorizedError("Unauthorized: Invalid token");
        }
      }

      const { uid, role } = decoded;

      const userData = await User.findOne({
        where: { uid },
      });

      if (!userData) {
        throw new NotFoundError("User not found");
      }

      req.user = decoded;
      req.userData = userData;

      next();
    });
  } catch (error) {
    console.error("Middleware error:", error);

    if (error instanceof UnauthorizedError) {
      return res.status(401).json({ message: error.message });
    } else if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    } else {
      return res.status(500).json({ message: "Internal server error" });
    }
  }
};

export default authMiddleware;
