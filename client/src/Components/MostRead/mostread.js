import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import {LikeButton,LikedContainer,LikedMainContainer,BooksContainer
    ,ImagesContainer,StyledImage ,CostLikeContainer} from './styledMostRead'
import Cookies from 'universal-cookie';
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import { HiEmojiSad } from "react-icons/hi";
import { useNavigate } from 'react-router';
import { FaEye } from "react-icons/fa";

const MostRead=()=>{
    const [mostread,setMostread]=useState([]);
    const [liked,setLiked]=useState([]);
    const cookies=new Cookies();
    const navigate=useNavigate();
    const token=cookies.get('jwtToken'); 
    useEffect(()=>{
        async function getData(){
            try{
                const token=cookies.get('jwtToken');
                const {data}=await axios.get("http://localhost:5000/api/mostread");
                setMostread(data);
                console.log(token);
                const likeddata = await axios.post("http://localhost:5000/api/liked", {
                         token:token
                });
                setLiked(likeddata.data);
                console.log("likeddata ", likeddata);
            }catch(error){
                console.log(error);
                toast.error(error.response.data);
            }   
        };

        getData();
    },[]);
    const getAuther=(authors)=>{
        const author=authors.split(',');
        return author[0];
    }
    const handleLike=async (id)=>{
        try{
  
            await axios.post(`http://localhost:5000/api/liked/${id}`,
            {token:token,user:''});
            const {data}=await axios.post(`http://localhost:5000/api/liked`,{token:token});
            setLiked(data);
        }
        catch(error){
                toast.error(error.response.data);
        }
    }
    const getLiked=(id)=>{
        const isLikedBook=liked.find(book=>book._id===id);
        return isLikedBook?true:false;
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
            <h1 style={{
                textAlign:'center',fontFamily:'monospace',
                textDecoration:"underline",marginBottom:20}}>
                    Signin to see your Most read books
            </h1>:
            <h1 style={{textAlign:'center',fontFamily:'monospace',
                textDecoration:"underline",marginBottom:20}}>
                    Most read Books
            </h1>}
            {mostread.length <1 && token &&<h3 
                style={{textAlign:'center',fontFamily:'monospace',  
                    marginBottom:20,color:'red',marginTop:100}}>
                    Most read books are not available. <HiEmojiSad/>
            </h3>}
            <BooksContainer>
            {Array.isArray(mostread)&&  mostread.map((book) => (
                <ImagesContainer key={book._id}>
                    <StyledImage src={book.image} 
                        onClick={()=> handleBookDetails(book._id)}
                        alt="bookimg">
                    </StyledImage>
                    <h1 style={{fontSize:18,
                        textAlign:'center'}}>
                        {book.title}
                    </h1>
                    <p style={{textAlign:'center',marginTop:0}}>by: <q>{getAuther(book.authors)}</q></p>
                    <CostLikeContainer>
                        <button style={{border:'none',borderRadius:4,
                            backgroundColor:'yellowgreen',color:'black',
                            fontSize:15,height:22,width:48}}>
                            {book.price===0?"Free":`$${book.price}`}
                        </button>
                        <p style={{margin:0,textAlign:'center',fontSize:18}}>
                            {book.views} <FaEye/></p>
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

export default MostRead;