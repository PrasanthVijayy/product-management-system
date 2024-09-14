// Inherit from Error class
class BadRequestError extends Error {
    constructor(message) {
      super(message);
      this.name = "BadRequestError";
    }
  }
  
  class UnauthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = "UnauthorizedError";
    }
  }
  
  class NotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = "NotFoundError";
    }
  }
  
  class ConflictError extends Error {
    constructor(message) {
      super(message);
      this.name = "ConflictError";
    }
  }
  
  class TooManyRequestsError extends Error {
    constructor(message) {
      super(message);
      this.name = "TooManyRequestsError";
    }
  }

  class InternalServerError extends Error {
    constructor(message) {
      super(message);
      this.name = "InternalServerError";
    }
  }
  
  export { BadRequestError, UnauthorizedError, NotFoundError, ConflictError, TooManyRequestsError, InternalServerError };
  