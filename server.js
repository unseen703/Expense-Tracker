const path  = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const transactions = require('./routes/transactions');
const connectDB = require('./config/db');
dotenv.config({path: './etc/secrets/config.env'});

connectDB();
const app = express();
app.use(express.json());

app.use('/api/v1/transactions', transactions)

const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server is running on ${process.env.NODE_ENV} mode on port${PORT}`.blue.bold))
