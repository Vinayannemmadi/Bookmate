const express=require('express');
const Books=require('../models/books.models');
const router=express.Router();

router.get('/',async(req,res,next)=>{
    try{
        const books=await Books.find().sort({rating:-1,views:-1}).limit(12);
        res.send(books);
    }
    catch(error){
        res.status(400).send('Trending Books are not available!');
        next();
    }
});

module.exports=router;