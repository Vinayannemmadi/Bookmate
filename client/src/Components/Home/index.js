import React, { useEffect, useState} from 'react'
import { BooksContainer, ButtonSearch, CostLikeContainer, HomeBox, ImagesContainer, 
  InputField, ItemsContainer, LikeButton, SearchBox, StyledImage} from './homestyled';
import { FaSearch } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import axios from 'axios';
import { IoMdHeartEmpty } from "react-icons/io";
import Cookies from 'universal-cookie';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';

const  Home =()=> {
  const [books,setBooks]=useState([]);
  const [search,setSearch]=useState("");
  const [fileteredBooks,setFiltered]=useState([]);
  const [liked,setLiked]=useState([]);
  const cookies=new Cookies();
  const navigate=useNavigate();

  useEffect(()=>{
      const getData=async()=>{
        try{
          const {data} = await axios.get("http://localhost:5000/api/books");
          setBooks(data);
          setFiltered(data);
          const cookie=new Cookies();
          const token=cookie.get('jwtToken');
          if(!token)
            setLiked([]);
          else{
            const likeddata=await axios.post('http://localhost:5000/api/liked',{token:token});
            setLiked(likeddata.data);
          }
        }
        catch(error){
          setFiltered([]);
        }
    }
    
      getData();
    },[]);
  const getAuther=(authors)=>{
      const author=authors.split(',');
      return author[0];
  }
  const getLiked=(id)=>{
    const isLikedBook=liked.find(book=>book._id===id);
    return isLikedBook?true:false;
  }
  const handleLike=async (id)=>{
      const cookies=new Cookies();
      const token=cookies.get('jwtToken');
      if(!token)
      {
        toast.error('Please Login to like this book!');
        return ;
      }
      try{
        if(!token)
            throw  new Error("Please Login First!");
            await axios.post(`http://localhost:5000/api/liked/${id}`,{token:token});
      }
      catch(error){
        toast.error(`Please login to Like this book`);
      }
      const book=fileteredBooks.find(book => book._id === id);
      const like=book.isLiked;
      setFiltered(prevBooks => {
        return prevBooks.map(book => {
            if (book._id === id) {
                return { ...book, isLiked: !like };
            }
            return book;
          });
        });
        const likeddata=await axios.post('http://localhost:5000/api/liked',{token:token});
          setLiked(likeddata.data);
  }
  const handleSearch=(event)=>{
      setSearch(event.target.value);
      let filtered=books;
       if(event.target.value !==''){
         filtered = books.filter(book =>
          book.title.toLowerCase().includes(search.toLowerCase())
        );
      }
        setFiltered(filtered);
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
      <HomeBox>
        <ToastContainer />
        <ItemsContainer>
          <SearchBox>
            <InputField type='text' placeholder='Search..' 
              onChange={handleSearch}
              value={search}
              />
            <ButtonSearch ><FaSearch/></ButtonSearch>
          </SearchBox>
          {search && <h1 style={{color:'black', textAlign:'center',fontSize:18}}>{fileteredBooks.length} books found</h1>}
          <BooksContainer>
            {Array.isArray(fileteredBooks) && fileteredBooks &&  fileteredBooks.map((book) => (
              <ImagesContainer key={book._id} >
                <StyledImage src={book.image} alt="bookimg" onClick={()=> handleBookDetails(book._id)}></StyledImage>
                  <h1 style={{fontSize:18,
                      textAlign:'center'}}>
                    {book.title}</h1>
                    <p style={{textAlign:'center',marginTop:0}}>by: <q>{getAuther(book.authors)}</q></p>
                    <CostLikeContainer>
                      <button style={{border:'none',borderRadius:4,backgroundColor:'yellowgreen',
                        color:'black',fontSize:15,height:22,width:40}}>{book.price===0? `Free`:`$${book.price}`}</button>
                      <LikeButton onClick={()=>handleLike(book._id)}>
                          {getLiked(book._id)===true ?
                            <FcLike size={22} 
                            // onClick={()=>handleRemoveLiked(book._id)}
                            />:
                          <IoMdHeartEmpty size={22}/>}
                      </LikeButton> 
                    </CostLikeContainer>
              </ImagesContainer>
            ))} 
          </BooksContainer>
        </ItemsContainer>
      </HomeBox>
    )
}

export default Home;