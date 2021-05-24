const express= require('express');
const dotenv= require('dotenv')
const colors= require('colors')
const cors= require('cors')

const app= express()

const Database= require('./database/db')

const productRoutes= require('./routes/productRoutes')
const userRoutes= require('./routes/userRoutes')

const {notFound, errorHandler}= require('./middlewares/errorMiddlewares')

dotenv.config()
//database
Database()

app.use(cors())
app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)

app.use(notFound);
app.use(errorHandler);

const PORT= process.env.PORT
app.listen(PORT, ()=> console.log(`SERVER UP AND RUNNING: ${PORT}`.green.bold))


