const errorAsync = require('express-async-handler')
const jwt = require("jsonwebtoken")
const User = require('../models/userModel')

const protect = errorAsync(async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT)
            req.user = await User.findById(decoded.id).select("-password")
            next()
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized! Token Failed");
        }
    }
})

const admin= (req, res, next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401);
        throw new Error("Not authorized as an admin");        
    }
}

module.exports = {protect, admin}
