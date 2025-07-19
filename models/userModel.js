import mongoose from "mongoose";

import validator from "validator";

import bcrypt from "bcryptjs";

import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },

    lastName: {
      typr: String,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      validate: validator.isEmail,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      select: true,
    },

    location: {
      type: String,
      default: "My City",
    },
  },
  { timestamps: true }
);

//middelware

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

//compare password

userSchema.methods.comparePassword = async function (userPassword) {
  const ismatch = await bcrypt.compare(userPassword, this.password);
  return ismatch;
};
//jsonwebtoken

userSchema.methods.createJWT = function () {
  return JWT.sign({ userId: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

export default mongoose.model("User", userSchema);
