import mongoose from "mongoose";

import colors from "colors";

const connectDB=async()=>{
    try{

        const conn= await mongoose.connect(process.env.MONGO_URL);

        console.log(`Connected to MongoDB database ${mongoose.connection.host}`.yellow.bold);

    } catch(error){
        console.log(`MongoDB error ${error}`.blue.bold)
    }
};

export default connectDB;