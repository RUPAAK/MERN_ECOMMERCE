const express= require('express')
const {loginUser, getUserProfile, registerUser, userProfileUpdate, getUsers}= require('../controllers/userControllers')
const router= express.Router()
const {protect, admin} = require('../middlewares/authMiddlewares')

router.post('/login', loginUser);

router.get('/profile', protect, getUserProfile)

router.post("/", registerUser);

router.get('/', protect, admin, getUsers)

router.put('/profile', protect, userProfileUpdate)

module.exports= router