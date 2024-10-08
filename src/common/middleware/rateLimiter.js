//API Rate Limiter to stop BRUTE FORCE ATTACKS.

import rateLimit from "express-rate-limit";
import { TooManyRequestsError } from "../../common/utils/error.js";

const apiLimiter = (n) => {
  return rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes wiating window
    max: n,
    handler: () => {
      throw new TooManyRequestsError(
        "Too many requests, please try again after 15 minutes."
      );
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

export default apiLimiter;
