const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
const connectDB = async ()=>{
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser : true,
            // useCreateINdex:true,
            useUnifiedTopology : true
        });

        console.log(`MONGODB connected : ${conn.connection.host}`.cyan.underline.bold);
    } catch(err){
console.log(`Error: ${err.message}`.red);
    }
}

module.exports = connectDB