// const express=require("express");

import express from "express";

import dotenv from "dotenv";

import colors from "colors";

import connectDB from "./config/db.js";

import testRoutes from "./routes/testRoutes.js";

import cors from "cors";

import morgan from "morgan";

import authRoutes from "./routes/authRoutes.js";

import errorMiddleware from "./middlewares/errorMiddelware.js";

import "express-async-errors"; // to handle async errors in express

//config
dotenv.config(); // dotenv.config(path:'path of env ') if the env is in another file

connectDB();

const app = express();

// app.get('/',(req,res)=>{
//     res.send("<h1>Welcome to Job Portal</h1>")

// })

// middleware

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

//routes
app.use("/api/v1/test", testRoutes);
app.use("/api/v1/auth", authRoutes);

//validation middelware
app.use(errorMiddleware);

//port....
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(
    `Server is running In ${process.env.DEV_MODE} mode on port ${PORT}`.blue
      .bold
  );
});
