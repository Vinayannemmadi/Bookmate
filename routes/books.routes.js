const mongoose=require('mongoose');
const User=require('../models/user.models');
const Liked=require('../models/liked.model');    
const express=require("express");
const Books = require('../models/books.models');
const app=express.Router();
const {getBooks,findBook}=require('../controllers/books.cotrollers.js');



app.get('/',getBooks);
app.get("/:id",findBook);

module.exports=app;

