const User=require('../models/user.models');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const dotenv=require('dotenv');
dotenv.config();
const Liked=require('../models/liked.model')

const signup=async(req,res,next)=>{
    console.log(req.body )
    try{
        if(!req.body.email || !req.body.password){
            return res.status(400).send({error:'Please Enter Email and Password'});
        }
        const exist=await User.findOne({email:req.body.email});
        if(exist){
           return  res.status(400).send({message:'Email already registered..'});
        }
        const newUser=new User(req.body);
        const salt= await bcrypt.genSalt(10);
        newUser.password=await bcrypt.hash(newUser.password,salt);
        const liked=new Liked({userId:newUser._id,booksArray:[]});
        await liked.save();
        await newUser.save();
        
         res.send(newUser);

     }catch(e){
        console.log(e);
        res.status(500).send('Error in Saving');
        next(e);
    }
}

const signin=async(req,res,next)=>{
    try{
        console.log('user trying to login...');
        console.log(req.body.username, req.body.password, req.body.email);

        if(!req.body.email || !req.body.username || !req.body.password){
            return res.status(400).send('Please Enter Email and Password');
        }
        const user=await User.findOne({email:req.body.email});

        console.log(user);
        if(!user){
            return res.status(404).send('User Not Found');
        }  
        const validPassword=await bcrypt.compare(req.body.password,user.password);
        if(!validPassword){
            return res.status(400).send('Invalid Password');
        }
        const token=jwt.sign({_id:user._id},process.env.TOKEN_SECRET);

        res.header('auth-token',token).send(token);


    }
    catch(error){
        console.log(error);
        next(error);
    }
}

module.exports={signup,signin};