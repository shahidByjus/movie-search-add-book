const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const cors =require('cors');
const { isEmpty } = require('lodash');
const mongoose = require('mongoose');
require('dotenv').config();

const routes = require("./routes");

const port = 5000;
const url = process.env.MONGODB_URI;

mongoose.connect(url, {useNewUrlParser : true}, {useUnifiedTopology : true});

const db = mongoose.connection;

db.on('error', err => {
    console.log('Mongoose error', err);
});

db.once('open', async () => {
    const app = express();
    
    app.use(cors());
    app.use(bodyParser.json());
    app.use('/',routes());
    
    app.listen(port, () => {
        console.log(`Listening to the port ${port}`);
    });
});





