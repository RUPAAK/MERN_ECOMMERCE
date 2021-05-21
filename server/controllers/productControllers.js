const Product= require('../models/productModel')
const asyncHandler= require('express-async-handler')

const getProducts= asyncHandler(async(req, res)=>{
    let products= await Product.find({})
    res.json(products)
})

const getProductById= asyncHandler(async(req, res)=>{
    let product= await Product.findById(req.params.id)
    if(product){
        res.json(product)
    }else{
        res.status(404)
        throw new Error('Product Not Found')
    }
})

module.exports= {getProducts, getProductById }

