function appError(status, code, message) {
  const error = new Error(message);
  error.status = status;
  error.code = code;
  return error;
}

function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const code = err.code || "INTERNAL_ERROR";
  const message = err.message || "Error interno del servidor";

  if (err.name === "SequelizeUniqueConstraintError") {
    return res.status(400).json({
      status: "error",
      code: "UNIQUE_CONSTRAINT_ERROR",
      message: err.errors.map((e) => e.message),
    });
  }

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      status: "error",
      code: "VALIDATION_ERROR",
      message: err.errors.map((e) => e.message),
    });
  }

  res.status(status).json({
    status: "error",
    code,
    message,
  });
}

module.exports = { errorHandler, appError };