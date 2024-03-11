const mongoose=require('mongoose');

const User=mongoose.model('User',new mongoose.Schema({
    username:{type:String,required:true},
    password:{type:String,required:true},
    email:{type:String,unique:true,required:true}
},{timestamps:true}));

module.exports=User;