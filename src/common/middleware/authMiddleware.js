import jwt from "jsonwebtoken";
import {
  UnauthorizedError,
  InternalServerError,
} from "./errorMiddleware.js";

const authMiddleware = async (req, res, next) => {
  try {
    const accessToken = req.cookies.accessToken;
    const refreshToken = req.cookies.refreshToken;

    if (!accessToken) {
      return next(new UnauthorizedError("No access token provided"));
    }

    // Verify the access token
    jwt.verify(accessToken, process.env.SECRET_KEY, async (err, decoded) => {
      if (err && err.name === "TokenExpiredError") {
        // Access token expired, check the refresh token
        if (!refreshToken) {
          return next(new UnauthorizedError("No refresh token provided"));
        }

        try {
          // Verify the refresh token
          const decodedRefreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

          // Issue a new access token
          const newAccessToken = jwt.sign(
            { uid: decodedRefreshToken.uid },
            process.env.SECRET_KEY,
            { expiresIn: "15m" }
          );

          // Set the new access token in the cookie
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: true,
            sameSite: "Strict",
            maxAge: 15 * 60 * 1000, // 15 minutes
          });

          // Attach the user to the request
          req.user = decodedRefreshToken;

          return next();
        } catch (refreshTokenError) {
          return next(new UnauthorizedError("Invalid refresh token"));
        }
      } else if (err) {
        // Handle other access token errors
        return next(new UnauthorizedError("Invalid access token"));
      }

      // Access token is valid, attach user to the request
      req.user = decoded;
      next();
    });
  } catch (error) {
    console.error("Middleware error:", error);
    next(new InternalServerError("An unexpected error occurred"));
  }
};

export default authMiddleware;
