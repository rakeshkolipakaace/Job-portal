// //error middleware || Next function

// const errorMiddleware = (err, req, res, next) => {
//   console.error(err);
//   res.status(500).send({
//     message: "Internal Server Error",
//     success: false,
//     error,
//   });
// };

// export default errorMiddleware;
const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  const defaultErrors = {
    statusCode: 500,
    message: err.message || "Internal Server Error",
  };

  //  Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    defaultErrors.statusCode = 400;
    defaultErrors.message = message.join(", ");
  }

  //  Duplicate Key Error
  if (err.code && err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    defaultErrors.statusCode = 400;
    defaultErrors.message = `${field} must be unique`;
  }

  // Send response at the end
  res.status(defaultErrors.statusCode).json({
    success: false,
    message: defaultErrors.message,
  });
};

export default errorMiddleware;
