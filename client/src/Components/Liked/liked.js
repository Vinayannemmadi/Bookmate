import React, { useEffect, useState } from 'react'
import { LikedMainContainer ,LikedContainer } from './styledLiked';
import axios from 'axios';
import { BooksContainer, CostLikeContainer, ImagesContainer, LikeButton, StyledImage} from './styledLiked';
import { FcLike } from "react-icons/fc";
import { IoMdHeartEmpty } from "react-icons/io";
import Cookies from 'universal-cookie';
// import { useLocation } from 'react-router';
import { HiEmojiSad } from "react-icons/hi";
import { toast } from 'react-toastify';
const Liked=()=>
{
    const [liked,setLiked]=useState([]);
    const cookies=new Cookies();
    const token=cookies.get('jwtToken');
    // const location=useLocation();
    useEffect(()=>{
        async function fetchData(){
            try{
                const cookie=new Cookies();
                const token=cookie.get('jwtToken');
                const {data}=await axios.post('http://localhost:5000/api/liked',{token:token});
                setLiked(data);
            }
            catch(er){
                toast.error(er.response.data);
            }
        }
        fetchData();
    });
    const getAuther=(authors)=>{
        const author=authors.split(',');
        return author[0];
    }
    const handleLike=async (id)=>{
        const cookies=new Cookies();
        const token=cookies.get('jwtToken');
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
    return (
        <LikedMainContainer>
            <LikedContainer>
                {!token ?

                <h1 style={{textAlign:'center',fontFamily:'monospace',textDecoration:"underline",
                    marginBottom:20}}>Signin to see your Liked Books</h1>:
                <h1 style={{textAlign:'center',fontFamily:'monospace',textDecoration:"underline",
                    marginBottom:20}}>Liked Books</h1>}
                {liked.length <1 && token &&<h3 style={{textAlign:'center',fontFamily:'monospace'
                ,marginBottom:20,color:'red',marginTop:100}}>
                        No liked books <HiEmojiSad/></h3>}
                <BooksContainer>
                {Array.isArray(liked)&&  liked.map((book) => (
                    <ImagesContainer key={book._id}>
                        <StyledImage src={book.image} alt="bookimg"></StyledImage>
                        <h1 style={{fontSize:18,
                        textAlign:'center'}}>
                        {book.title}</h1>
                        <p style={{textAlign:'center',marginTop:0}}>by: <q>{getAuther(book.authors)}</q></p>
                        <CostLikeContainer>
                        <button style={{border:'none',borderRadius:4,backgroundColor:'yellowgreen',
                            color:'black',fontSize:15,height:22,width:40}}>$15</button>
                        <LikeButton onClick={()=>handleLike(book._id)}>
                            {book.isLiked === true ?
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

export default  Liked;