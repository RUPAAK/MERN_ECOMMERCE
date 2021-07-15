const router= require('express').Router()

const {protect} = require('../middlewares/authMiddlewares')
const {addOrderItems,getOrderById, updateOrderById, getMyOrders}= require('../controllers/orderControllers')

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)
router.put("/:id/pay", protect, updateOrderById)
router.get('/myorders', protect, getMyOrders)


module.exports= router  