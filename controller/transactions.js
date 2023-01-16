const Transaction  = require('../models/transactions')
// @desc get all transactions
// @routes GET/api/v1/transactions
// 0@access Public
exports.getTransactions = async (req, res, next)=>{
    // res.send("GET transactions")
  try { const transactions = await Transaction.find();
    return res.status(200).json({
        success :true,
        count: transactions.length,
        data: transactions
    })}
    catch(err){
return res.status(500).json({
    success: false,
    error: 'Server Error'
});
    }
}
// @desc get all transactions
// @routes GET/api/v1/transactions
// 0@access Public
exports.addTransactions = async(req, res, next)=>{
  try { const {text, amount} = req.body;
    const transaction = await Transaction.create(req.body);
    return res.status(201).json({
        success :true,
        data :transaction
    }); }
    catch(err){
        if(err.name === 'ValidationError'){
            const messages = Object.values(err.errors).map(val => val.text);
            return res.status(400).json({
                success: false,
                // message : "please add text",
                error: messages
            });
        }
        else {
            return res.status(500).json({
                success: false,
                error: 'Server Error'
            });
        }
// console.log(err);
// process.exit();
    }
    // res.send("POST transactions")
}
// @desc get all transactions
// @routes GET/api/v1/transactions
// 0@access Public
exports.deleteTransactions = async (req, res, next)=>{
    // res.send("DELETE transactions")
    try { 
    const transaction = await Transaction.findById(req.params.id);
    if(!transaction){
        return res.status(404).json({
            success : false,
            error: 'No trasaction found'
        });
    }
    await transaction.remove();
    return res.status(200).json({
        success :true,
        data : {}
    }); }
    catch(err){
        return res.status(500).json({
            success: false,
            error: 'Server Error'
        });
// console.log(err);
// process.exit();
    }
}