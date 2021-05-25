const express= require('express')
const {loginUser, getUserProfile, registerUser}= require('../controllers/userControllers')
const router= express.Router()
const protect = require('../middlewares/authMiddlewares')

router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile)

router.post("/", registerUser);

module.exports= router