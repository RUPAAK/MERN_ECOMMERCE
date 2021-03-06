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
        res.status(400)
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

const updateOrderById = asyncHandler(async (req, res)=>{
    const order= await Order.findById(req.params.id)
    if(order){
        order.isPaid= true,
        order.paidAt= Date.now()
        order.paymentMethod= {
            id: req.body._id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updatedOrder = await order.save();
        res.json(updatedOrder);
    }else{
        res.status(404);
        throw new Error("Order not Found");
    }
})

const getMyOrders = asyncHandler(async (req, res) => {
    res.send('hi')
});

module.exports= {addOrderItems, getOrderById, updateOrderById, getMyOrders}