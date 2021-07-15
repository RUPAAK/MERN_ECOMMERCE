const Product = require('../models/productModel')
const asyncHandler = require('express-async-handler')

const getProducts = asyncHandler(async (req, res) => {
    let products = await Product.find({})
    res.json(products)
})

const getProductById = asyncHandler(async (req, res) => {
    let product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.status(200).json(porducts)
})

const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: "Product Deleted" })
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
})

const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;
    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updateProduct);
    } else {
        res.status(404);
        throw new Error("Product Not Found");
    }
})

const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: "Simple name",
        price: 0,
        user: req.user._id,
        image: "/images/spample.jpg",
        brand: "Sample brand",
        category: "Simple Category",
        countInStock: 0,
        numReviews: 0,
        description: "Simple Description",
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
})

module.exports = { getProducts, getProductById, getTopProducts, deleteProduct, updateProduct, createProduct  }

