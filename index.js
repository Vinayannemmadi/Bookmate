const express=require('express');
const mongoose=require('mongoose');
const swaggerDocument = require('./swagger.json');
const swaggerUi = require('swagger-ui-express');
const app=express();
const cors=require('cors');
const dotenv=require('dotenv');
const path=require('path');
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors({ origin: 'http://localhost:3000'}));

app.use('/api/liked/:id', (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

mongoose.connect(process.env.mongodb_url)
    .then(()=>console.log( "Connected to MongoDB"))
    .catch((err)=> console.error("Error connecting to MongoDB", err)); 
//Imports..
const booksRouter = require('./routes/books.routes');
const authRouter=require('./routes/auth.routes');
const likedRouter=require('./routes/liked.routes');
const testRouter=require('./test');
const newbooksRouter=require('./routes/newbooks.routes');
const fileRouter=require('./routes/file.routes');
const trendingRouter=require('./routes/trending.routes');
const mostreadRouter=require('./routes/mostread.routes');

//Routes..

app.use('/api/mostread',mostreadRouter);
app.use('/api/trending',trendingRouter);
app.use('/api/file',fileRouter);
app.use("/api/newbooks",newbooksRouter);
app.use("/api/books",booksRouter);
app.use('/api/auth',authRouter);
app.use('/api/liked',likedRouter);
app.use('/test',testRouter);
app.use('/files', express.static('files'));

app.use(express.static(path.join(__dirname,'/client/build')));
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'client','build','index.html'));
});

app.listen(5000, () => console.log('Listening on port 5000...'));