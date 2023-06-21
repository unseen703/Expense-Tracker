const mongoose = require('mongoose');
const TransactionSchema = new mongoose.Schema({
    
    type:{
        type:String,
        required : [true, 'Please select a type']
    },
    category:{
        type:String,
        required : [true, 'Please select a catagory']
    },
    amount:{
        type:Number,
        required:[true, 'Please add valid amount']
    },
    date:{
        type:Date,
        required: [true, 'Please add appropriate date']
    },
    
});
module.exports = mongoose.model('Transaction', TransactionSchema);