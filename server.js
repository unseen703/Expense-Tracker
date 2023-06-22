const path  = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');

const bodyParser  = require ('body-parser');
const cors = require ('cors');
const connectDB = require('./config/db');
const transactions = require('./routes/transactions');

const app = express();

// dotenv.config({path: './etc/secrets/config.env'});

dotenv.config({path: './config/config.env'});

connectDB();

app.use(bodyParser.urlencoded({limit :"30mb", extended :true }));
app.use(cors());
app.use(bodyParser.json({limit :"30mb", extended :true }));
app.use(express.json());

app.use('/api/v1/transactions', transactions);
app.use('/', transactions);

const PORT = process.env.PORT || 5000;
app.listen(PORT,console.log(`server is running on ${process.env.NODE_ENV} mode on port${PORT}`.blue.bold))
