const router= require('express').Router()

const {protect} = require('../middlewares/authMiddlewares')
const {addOrderItems,getOrderById, updateOrderById, getMyOrder}= require('../controllers/orderControllers')

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)
router.put("/:id/pay", protect, updateOrderById)
router.get('/myorders', protect, getMyOrder)


module.exports= router  