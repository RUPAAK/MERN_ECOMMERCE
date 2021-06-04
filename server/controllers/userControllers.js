const User= require('../models/userModel')
const errorAsync= require('express-async-handler')
const generateToken= require('../utils/generateToken')

const loginUser= errorAsync(async(req, res)=>{
    const {email, password }= await req.body;
    const user= await User.findOne({email})
    if(user && (await user.matchPassword(password) )){
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    }else{
        res.status(401)
        throw new Error("Invalid Credientials")

    }
})

const getUserProfile = errorAsync(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User belonging to this token no longer exist");
  }
});


const registerUser = errorAsync(async (req, res) => {
    const { name, email, password } = req.body;
    const userExist = await User.findOne({ email });
  
    if (userExist) {
      res.status(400);
      throw new Error("User already exists");
    }
  
    const user = await User.create({
      name,
      email,
      password,
    });
  
    if (user) {
      res.status(201);
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid User Data");
    }
  });

const userProfileUpdate= errorAsync(async(req, res)=>{
  const user= await User.findById(req.user._id)

  if(user){
    user.name= req.body.name || user.name
    user.email= req.body.email || user.email

    if(req.body.password){
      user.password= req.body.password
    }

    const updatedUser= await user.save();
    res.json({
      _id: userProfileUpdate._id,
      name: userProfileUpdate.name,
      email: userProfileUpdate.email,
      isAdmin: userProfileUpdate.isAdmin,
      token: generateToken(userProfileUpdate._id)
    })
  }else{
    res.status(404)
    throw new Error('FAILED TO UPDATE. SOME ERROR OCCURED')
  }
})

module.exports={loginUser, getUserProfile, registerUser, userProfileUpdate}