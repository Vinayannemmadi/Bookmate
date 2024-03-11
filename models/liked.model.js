const mongoose=require('mongoose');
const User=require('../models/user.models')
const Books= require('../models/books.models')

const Liked=mongoose.model('Liked',new mongoose.Schema({
    booksArray:[Books.schema],
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
}));


module.exports=Liked;