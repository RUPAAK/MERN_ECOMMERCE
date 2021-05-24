const express= require('express')
const {loginUser, getUserProfile}= require('../controllers/userControllers')
const router= express.Router()
const protect = require('../middlewares/authMiddlewares')

router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile)

module.exports= router