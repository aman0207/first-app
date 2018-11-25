const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const route = require('./routes/route');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost:27017/respmodel');
mongoose.connection.on('connected',()=>{
    console.log('connected to db @ 27017')
})

mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log(`Error in db connection: ${err}`)
    }
})
app.use('/api',route);
app.listen(4000);