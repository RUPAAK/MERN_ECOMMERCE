const User= require('../models/userModel')
const errorAsync= require('express-async-handler')
const generateToken= require('../utils/generateToken')

const loginUser= errorAsync(async(req, res)=>{
    const {email, password }= await req.body;
    const user= await User.findOne({email})
    if(user && (await user.matchPassword )){
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

const getUserProfile= errorAsync(async(req,res)=>{
    res.send({user: req.user})
})

module.exports={loginUser, getUserProfile}