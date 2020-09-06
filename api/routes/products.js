const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const mongoose = require('mongoose');

router.get('/',(req,res,next)=>{
    res.status(200).json({
        message:'GET /products'
    });
    
});

router.post('/',(req,res,next)=>{

    // const productCreated = {
    //     price : req.body.price,
    //     name : req.body.name
    // };

    //mongoose product object

    // res.status(201).json({
    //     message:'POST /products with product ',
    //     product:productCreated
    // });

    const mongooseProduct = new Product({
            _id : new mongoose.Types.ObjectId(),
            price : req.body.price,
            name : req.body.name
    });

    mongooseProduct.save().
    then((result)=>{
        console.log(result);
        res.status(201).json({
            message:'POST /products with product ',
            product:mongooseProduct
        });
    })
    .catch(err=>console.log(err))

    
});



router.get('/:productId',(req,res,next)=>{
    const productId = req.params.productId;
    res.status(200).json({
        message:'GET /products/id is called with id '+productId
    });
    
});



router.patch('/:productId',(req,res,next)=>{
    const productId = req.params.productId;
    res.status(200).json({
        message:'Update /products/id is called with id '+productId
    });
    
});

router.delete('/:productId',(req,res,next)=>{
    const productId = req.params.productId;
    res.status(200).json({
        message:'DELETE /products/id is called with id '+productId
    });
    
});



module.exports = router;