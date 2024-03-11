const express=require('express');
const router=express.Router();
const Liked=require('../models/liked.model');
const Books=require('../models/books.models');
const app = require('./books.routes');
const jwt =require('jsonwebtoken');
const bodyParser=require('body-parser');

router.use(bodyParser.json());

router.get('/:id',async(req,res)=>{
    try{
        const liked=await Books.findOne({_id:req.params.id}); 
        res.send(liked);  
    }
    catch(error){
        req.status(400).send('book not found');
    }
});

function verifyToken(req, res, next) {
  const bearerHeader = req.headers['authorization'];

  if (typeof bearerHeader !== 'undefined') {
    const bearerToken = bearerHeader.split(' ')[1];
    req.token = bearerToken;
    next();
  } else {
    // Forbidden if no token
    res.sendStatus(403);
  }
}
const authenticateToken=(req,res,next)=>{
    const {token}=req.body;
    if(!token) return res.status(400).send("Authentication Required");
    
    jwt.verify(token,'your-secret', (err,decoded)=>{
        if(err)return res.status(400).send({message:"Invalid Token"});
        req.user=decoded;
        next();
    });
};


router.post('/',authenticateToken,async(req,res)=>{
    const userId=req.user._id;
    const user=await Liked.findOne({userId:userId});
    if(!user){
        res.status(400).send({message:'Login error'});
    }
    res.send(user.booksArray);
});

router.post('/:id', authenticateToken,async (req, res) => {
    const bookId=req.params.id;
    const userId=req.user._id;
    try {
        const user = await Liked.findOne({ userId: userId });
        if(!user){
            res.status(404).send({message:"User not found"});
        }
        if (user) {
            
            const liked = await Liked.findOne({ booksArray: { $elemMatch: {_id: bookId } } });
            
            if(liked){
                const book=await Books.findById({_id:bookId});
                const likedId=liked._id;
                const updated=await Liked.findByIdAndUpdate(
                    {_id:likedId},
                    { $pull:{booksArray:{_id:book._id}}},
                    {new:true}
                );
                res.send({message:"book removed from liked"});
            }
            else{
                const book=await Books.findOne({_id:bookId}); 
                book.isLiked=true;
                const updated = await Liked.findOneAndUpdate(
                    { userId: userId },
                    { $push : { booksArray: book } }
                );
                res.send({message:"book added to liked"});
            }
        }
    } 
    catch (error) {
        return res.status(500).send({message:'this book cannot be added to liked'});
    }
});

router.put('/:id',async(req,res)=>{
    const liked=await Books.findById(req.params.id);
    if(!liked){
        res.status(400).send("book not found");
    }
    else{

        const modify=await Liked.findOneAndUpdate({book_id:req.params.id},
            {isLiked:req.body.liked});
            res.send(modify);
    }
});

module.exports=router;