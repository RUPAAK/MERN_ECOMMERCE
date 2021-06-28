const router= require('express').Router()

const protect = require('../middlewares/authMiddlewares')
const {addOrderItems,getOrderById, updateOrderById}= require('../controllers/orderControllers')

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)
router.put("/:id/pay", protect, updateOrderById)


module.exports= router  