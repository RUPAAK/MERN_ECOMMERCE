const express= require('express')
const router= express.Router()
const { protect, admin } = require("../middlewares/authMiddlewares.js")


const {getProducts, getProductById, getTopProducts, deleteProduct, updateProduct, createProduct}= require('../controllers/productControllers')

router.get('/', getProducts)
router.get('/:id', getProductById)
router.get('/top', getTopProducts)
router.post('/', protect, admin, createProduct)
router.delete('/:id', protect, admin, deleteProduct)
router.put("/:id", protect, admin, updateProduct)

module.exports= router;