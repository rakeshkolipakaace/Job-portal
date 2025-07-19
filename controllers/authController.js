// import userModel from "../models/userModel.js";

// export const registerController = async (req, res, next) => {
//   try {
//     const { name, email, password } = req.body;

//     if (!name || !email || !password) {
//       //   return res.status(400).send({
//       //     message: "Please Provide All Fields",
//       //     success: false,
//       //   });

//       next("provide all feilds");
//     }

//     const existingUser = await userModel.findOne({ email });
//     if (existingUser) {
//       //   return res.status(400).send({
//       //     message: "User Already Exists",
//       //     success: false,
//       //   });

//       next("user already exists");
//     }

//     const user = await userModel.create({ name, email, password });
//     res.status(201).send({
//       message: "User Created Successfully",
//       success: true,
//       user,
//     });
//   } catch (error) {
//     // console.log(error);
//     // res.status(400).send({
//     //   message: "Error In Register Controller",
//     //   success: false,
//     //   error,
//     // });

//     next(error);
//   }
// };

import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Check for missing fields
  if (!name || !email || !password) {
    return next(new Error("Please provide all fields"));
  }

  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  // if (existingUser) {
  //   return next(new Error("User already exists"));
  // }

  // Create new user
  const user = await userModel.create({ name, email, password });

  //token

  const token = user.createJWT();

  res.status(201).send({
    message: "User created successfully",
    success: true,
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
    },
    token,
  });
};

export const loginController = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next("Please provide all fields");
  }

  //find user by name
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    next("Invalid Username or password");
  }

  //compare password

  const ismatch = await user.comparePassword(password);
  if (!ismatch) {
    next("Invalid Username or password");
  }

  user.password = undefined;
  const token = user.createJWT();
  res.status(200).json({
    success: true,
    message: "Login Successful",
    user,
    token,
  });
};
