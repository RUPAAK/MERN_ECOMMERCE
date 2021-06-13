const asyncHandler= require('express-async-handler')
const Order= require('../models/orderModel')

const addOrderItems= asyncHandler(async(req, res)=>{
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    }= await req.body

    if(orderItems && orderItems.length===0){
        res,status(400)
        throw new Error('No Order Items')
    }else{
        const order= new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        })  
        const createOrder= await order.save()
        res.status(201).json(createOrder)
    }
})

const getOrderById =asyncHandler(async(req, res)=>{
    const order= await Order.findById(req.params.id).populate(
        "user", 
        "name email"
    )
    if(order){
        res.json(order)
    }else{
        res.status(404)
        throw new Erro('Order Not Found')
    }
})

module.exports= {addOrderItems, getOrderById}