const express=require('express');
const router=express.Router();
const Books=require('../models/books.models');


router.get('/', async(req, res, next) => {
    try{
            const books=await Books.find().sort('published_date').limit(10);
            res.send(books);;
    }
    catch(error){
            console.log("error to find new books");
            res.status(400).send('New Books are not available!');
    }
});

module.exports=router;