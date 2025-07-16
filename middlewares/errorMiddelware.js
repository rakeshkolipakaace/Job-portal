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
  console.error(err.stack); // Optional: logs the error stack in the console

  res.status(500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;
