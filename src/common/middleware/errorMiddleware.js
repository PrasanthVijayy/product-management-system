// Custom error handling middleware
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  // Handle different types of errors
  if (err.name === "BadRequestError") {
    // Custom validation error handling
    return res.status(400).json({
      status: "error",
      message: err.message,
    });
  } else if (err.name === "UnauthorizedError") {
    // Custom unauthorized error handling
    return res.status(401).json({
      status: "error",
      message: err.message,
    });
  } else if (err.name === "NotFoundError") {
    // Custom not found error handling
    return res.status(404).json({
      status: "error",
      message: err.message,
    });
  } else if (err.name === "ConflictError") {
    // Custom conflict error handling
    return res.status(409).json({
      status: "error",
      message: err.message,
    });
  } else if (err.name === "TooManyRequestsError") {
    // Custom too many requests error handling
    return res.status(429).json({
      status: "error",
      message: err.message,
    });
  } else if (err.name === "InternalServerError") {
    // Custom internal server error handling
    return res.status(500).json({
      status: "error",
      message: err.message || "Internal Server Error",
    });
  } else {
    // General error handling for unexpected errors
    return res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export default errorMiddleware;
