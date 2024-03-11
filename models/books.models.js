const mongoose=require('mongoose');

const Books=mongoose.model('Books',new mongoose.Schema({

    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true, // MongoDB will automatically generate unique IDs
        required: true // Ensure _id is always provided
    },
    isLiked:Boolean,
    title:String,
    subtitle:String,
    authors:String,
    image:String,
    published_date:{
        default:Date.now,
        type:Date,
    },
    discription:String,
    rating:Number,
    views:Number,
    filename:String,
    autherdescription:String

}));

module.exports=Books;