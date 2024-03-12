const Books= require('../models/books.models');
const  mongoose = require('mongoose');
const getBooks=async(req,res,next)=>{
    try{
        const books=await Books.find()
        .sort('title'); 
        res.send(books);
    }catch(err){
        res.status(500).send(err);
    }
    
}

const findBook=async(req,res,next)=>{
    let id= req.params.id;
    // console.log("ID: "+id);
    try{
        const objectId=new mongoose.Types.ObjectId(req.params.id);
        const book=await Books.findById(req.params.id);
        
        if(!book){
            res.status(400).send("book not found");
        }
        res.send(book);
    }
    catch(error){
        console.log("error in fecting data...", error);
        res.status(400).send("error in fecting data...");
    }

}

module.exports={getBooks,findBook};

