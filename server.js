const path  = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const transactions = require('./routes/transactions');
const connectDB = require('./config/db');
dotenv.config({path: './config/config.env'});

connectDB();
const app = express();
app.use(express.json());
if(process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'));
}
app.use('/api/v1/transactions', transactions)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'));
    app.get('*', (res, req)=>res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}
const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server is running on ${process.env.NODE_ENV} mode on port${PORT}`.blue.bold))