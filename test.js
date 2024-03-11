const mongoose=require('mongoose');
const User=require('./models/user.models');
const Liked=require('./models/liked.model');    
const express=require("express");
const Books = require('./models/books.models');
const app=express();

app.get("/:id",async(req,res)=>{
    const objectId=new mongoose.Types.ObjectId(req.params.id);  
    console.log(objectId);

    const book=await Books.findById(req.params.id);

    if(!book){
        res.status(400).send("book not found");
    }
    res.send(book);
});
app.get('/',async(req,res)=>{
    const books=await Books.find();
    res.send(books);
});

module.exports=app;


// router.put('/api/liked/:id',async(req,res)=>{
    //     console.log('likebutton clicked');
    //     const objectId = new  mongoose.Types.ObjectId(req.params.id);
    //     // const liked=req.body.liked==="true"? true:false;
    //     // const liked= mongoose.Types.Boolean(req.body.liked);
    //     const book=await Books.updateOne(
        //         {_id:objectId},
//         {$set:{isLiked:req.body.liked}}
//     );
//     // const result=await book.save();
//     res.send(book);
    
//  });
// Line 36:7:  React Hook useEffect has a missing dependency: 'cookies'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

// webpack compiled with 1 warning
// One of your dependencies, babel-preset-react-app, is importing the
// "@babel/plugin-proposal-private-property-in-object" package without
// declaring it in its dependencies. This is currently working because
// "@babel/plugin-proposal-private-property-in-object" is already in your
// node_modules folder for unrelated reasons, but it may break at any time.

// babel-preset-react-app is part of the create-react-app project, which
// is not maintianed anymore. It is thus unlikely that this bug will
// ever be fixed. Add "@babel/plugin-proposal-private-property-in-object" to        
// your devDependencies to work around this error. This will make this message      
// go away