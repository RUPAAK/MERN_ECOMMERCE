const mongoose= require("mongoose")
const dotenv= require("dotenv")
const colors= require("colors")
const users= require("./data/users")
const products= require("./data/Products")
dotenv.config();

const User= require("./models/userModel")
const Product= require("./models/productModel")
const Order= require("./models/orderModel")

const Database = require("./database/db")

Database()

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUser = await User.insertMany(users);

    const adminUser = createdUser[0]._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: adminUser };
    });

    const createdProducts = await Product.insertMany(sampleProducts);

    console.log("Data Imported!".green.inverse);
  } catch (err) {
    console.error(`${err}`.red.inverse);

    process.exit(1);
  }
};

importData();