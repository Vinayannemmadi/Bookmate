import React, { useEffect, useState } from 'react'
import { LikeButton,LikedContainer,LikedMainContainer,BooksContainer,
    ImagesContainer,StyledImage ,CostLikeContainer} from './styledNewbooks';
import Cookies from 'universal-cookie';
import { FcLike } from 'react-icons/fc';
import { IoMdHeartEmpty } from 'react-icons/io';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaStar } from 'react-icons/fa';

const NewBooks=()=>{
    const cookies=new Cookies();
    const token=cookies.get('jwtToken');
    const [newbooks,setNewbooks]=useState([]);
    const [liked,setLiked]=useState([]);
    const navigate=useNavigate();

    useEffect(()=>{
        async function getData(){
            try{
                const {data}=await axios.get("http://localhost:5000/api/newbooks");
                setNewbooks(data);
                const likeddata = await axios.post("http://localhost:5000/api/liked", {
                         token:token
                });
                setLiked(likeddata.data);
            }
            catch(error){
                console.log(error);
                toast.error(error.response.data);
            }
        } 
        getData();
    });
    const handleLike=(id)=>{
            try{
                if(!token) return toast.warn("Please login to like this book"); 
                axios.post(`http://localhost:5000/api/liked/${id}`,{token:token,user:''});
                const book=newbooks.find(book => book._id === id);
                const like=book.isLiked;
                setLiked(prevBooks => {
                    return prevBooks.map(book => {
                        if (book._id === id) {
                            return { ...book, isLiked: !like };
                        } else {
                            return book;
                        }
                    })
                });
            }
            catch(error){
                toast.error(error.response.data);
            }
    }
    const getLiked=(id)=>{
        const isLikedBook=liked.find(book=>book._id===id);
        return isLikedBook?true:false;
    }
    const getAuther=(authors)=>{
        const author=authors.split(',');
        return author[0];
    }
    const handleBookDetails=(id)=>{
        const token=cookies.get('jwtToken');
        if(!token){
          toast.error('Please login to view details');
        }
        else{
          navigate(`/bookdetails/${id}`);
        }
      }
    return (
        <LikedMainContainer>
        <LikedContainer>
            {!token ?

            <h1 style={{textAlign:'center',fontFamily:'monospace',textDecoration:"underline",
                marginBottom:20}}>Signin to see your New Books</h1>:
            <h1 style={{textAlign:'center',fontFamily:'monospace',textDecoration:"underline",
                marginBottom:20}}> New Books</h1>}
            {newbooks.length <1 && token &&<h3 style={{textAlign:'center',fontFamily:'monospace'
            ,marginBottom:20,color:'red',marginTop:100}}>
                    New books not available! </h3>}
            <BooksContainer>
            {Array.isArray(newbooks)&&  newbooks.map((book) => (
                <ImagesContainer key={book._id}>
                    <StyledImage 
                        src={book.image} alt="bookimg"
                        onClick={()=> handleBookDetails(book._id)}>
                    </StyledImage>
                    <h1 style={{fontSize:18,
                        textAlign:'center'}}>
                        {book.title}
                    </h1>
                    <p style={{textAlign:'center',marginTop:0}}>
                        by: <q>{getAuther(book.authors)}</q>
                    </p>
                    <CostLikeContainer>
                        <button style={{border:'none',borderRadius:4,backgroundColor:'yellowgreen',
                            color:'black',fontSize:15,height:22,width:40}}>
                            {book.price===0?"Free":`$${book.price}`}
                        </button>
                        <p style={{margin:0,textAlign:'center',fontSize:18}}>
                            {book.rating} <FaStar/>
                        </p>
                        <LikeButton onClick={()=>handleLike(book._id)}>
                        { getLiked(book._id) ?
                            <FcLike size={22} />:
                            <IoMdHeartEmpty size={22}/>}
                        </LikeButton> 
                    </CostLikeContainer>
                </ImagesContainer>
        ))} 
      </BooksContainer>
            </LikedContainer>
        </LikedMainContainer>
    )
}

export default NewBooks;