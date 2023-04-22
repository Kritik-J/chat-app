// extends means AppError is inherit from Error class

class AppError extends Error {
  constructor(message, statusCode) {
    // super is constructor of class Error
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default AppError;
