const mongoose= require('mongoose')

const Database=()=>{
    mongoose.connect('mongodb://localhost:27017/mern_ecommerce', {
        useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true,})
        .then(()=> console.log('CONNECTION TO DATABASE ESTABLISHED'.cyan.bold))
        .catch((e)=> console.error(`Error: ${e.message}`.red.bold))
}

module.exports= Database