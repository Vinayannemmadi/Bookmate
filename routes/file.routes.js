const express=require('express');
const { model } = require('mongoose');
const router=express.Router();
const Books=require('../models/books.models');

router.get('/:id',async(req,res)=>{
    try{
      const {id}=req.params;
      console.log("id in files: ",id);
      const file=await Books.findById({_id:id});
      console.log(file);
      if(!file)return res.status(400).send("Book not found in database!");
      console.log(file.filename);
      
      res.download(`D:/Desktop/bookbackend/files/${file.filename}.pdf`, 
      `${file.filename}.pdf`, {
      contentType: 'application/pdf',
      filename: `${file.filename}`});
    }
    catch(error){
      console.log("error");
      res.send('this file can not be downloaded');
    }
  });

module.exports=router;