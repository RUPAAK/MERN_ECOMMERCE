const router= require('express').Router()

const protect = require('../middlewares/authMiddlewares')
const {addOrderItems,getOrderById}= require('../controllers/orderControllers')

router.post('/', protect, addOrderItems)
router.get('/:id', protect, getOrderById)

module.exports= router  