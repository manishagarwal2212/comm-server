const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect(
    "mongodb+srv://commAdmin:commPassword@mum-comm.tbq5c.mongodb.net/commDB?retryWrites=true&w=majority",
    {
        useNewUrlParser : true, 
        useUnifiedTopology: true 
    }
);

// app.use((req,res,next)=>{
//     res.status(200).json({message:'hello server here'});
//     console.log("after send response");
// });

const productRoutes = require('./api/routes/products');

//loging everything
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/products',productRoutes);

//error handling

//404
app.use((req,res,next)=>{
    console.log('setting not found');
    const error = new Error('resource not found');
    error.status= 404;
    next(error);
    console.log('seted not found');
});

app.use((error,req,res,next)=>{
    console.log('previous status'+error.status);
    res.status(error.status||500);
    res.json({
        error:{
            message:error.message
        }
    });
});

module.exports = app;