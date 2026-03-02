import userModel from "../models/userModel.js";

export const updateUserController = async (req, res, next) => {
  const {name,email,lastName,location}=req.body
  if(!name||!email||!lastName||!location){
    return next(new Error('please provide all fields'))
  }

  const user=await userModel.findById(req.user.userId)
  user.name=name
  user.lastName=lastName
  user.email=email
  user.location=location

  await user.save()
  const token=user.createJWT()
  res.status(200).json({
    success:true,
    message:"User updated successfully",
    user,
    token
  })
};
