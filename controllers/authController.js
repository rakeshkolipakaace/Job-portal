import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        message: "Please Provide All Fields",
        success: false,
      });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        message: "User Already Exists",
        success: false,
      });
    }

    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      message: "User Created Successfully",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error In Register Controller",
      success: false,
      error,
    });
  }
};
