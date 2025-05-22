// const express=require("express");

import express from "express";

import dotenv from "dotenv";

import colors from "colors";

import connectDB from "./config/db.js";


//config
dotenv.config(); // dotenv.config(path:'path of env ') if the env is in another file

connectDB();


const app=express();


app.get('/',(req,res)=>{
    res.send("<h1>Welcome to Job Portal</h1>")

})


//port 
 const PORT=process.env.PORT || 4000;
app.listen(PORT,()=>{

    console.log(`Server is running In ${process.env.DEV_MODE} mode on port ${PORT}`.blue.bold);

})