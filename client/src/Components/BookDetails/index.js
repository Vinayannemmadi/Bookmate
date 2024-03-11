import React, { useEffect, useState } from 'react'
import { BookContainer,BookMainContainer,DownloadButton,ReadButton } from './styledBookDetails';
import { BooksContainer, StyledImage } from './styledBookDetails';
import { toast } from 'react-toastify';
import axios from 'axios';
import {FaBookReader} from "react-icons/fa";
import { useParams } from 'react-router';
import { FaDownload } from "react-icons/fa";
 const  BookDetails=()=> {
  const {id}=useParams();
  // console.log(id);
  const [bookDetails,setBook]=useState({});
  useEffect(()=>{
    const getData=async()=>{
      try{
        const {data} = await axios.get(`http://localhost:5000/api/books/${id}`,{id});
        // console.log("data in book details",data);
        setBook(data);
      }
      catch(error){
        // console.log("error in home route ",error);
        toast.error(error.response.data);
      }
    }
    getData();
  },[id]); const handleDownload = async(id) => {
    try {
      const book=await axios.get(`http://localhost:5000/api/books/${id}`);
      console.log(book.data._id);
      axios({
        url: `http://localhost:5000/api/file/${id}`,
        method: 'GET',
        responseType: 'blob', // Set the response type to blob
      })
      .then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `${book.data.title}.pdf`); // Set the filename for download
        document.body.appendChild(link);
        link.click();
        toast.success("Downloaded successfully");
      })
      .catch(error => {
        console.error(error);
        toast.error('Error occurred while downloading!');
      });
    } catch (error) {
      // console.log(error);
      toast.error('This Book can not be downloaded!')
    }
  };
  
  const handleRead=async(id)=>{
    const book=await axios.get(`http://localhost:5000/api/books/${id}`);
    console.log(book.data._id);
      window.open(`http://localhost:5000/files/${book.data.filename}.pdf`,
      'noreferrer');
  }
  return (
    <BookMainContainer>
      <BookContainer>
          <h1 style={{textAlign:"center" , fontFamily:"monospace"}}><q>{bookDetails.title}</q></h1>
          <BooksContainer>
            <StyledImage src={bookDetails.image}></StyledImage>
            <div style={{margin:20,fontFamily:"monospace"}}>
              <h1 style={{marginTop:10,color:"#F7673D"}}>Book Name:</h1>
                <h2 style={{textAlign:"center",fontFamily:"cursive"}}>{bookDetails.title}</h2>
              <h1 style={{marginTop:10,color:"#F7673D"}}>Authors:</h1>
                <h2 style={{textAlign:"center",fontFamily:"cursive"}}>{bookDetails.authors}</h2>
              {bookDetails.subtitle && <>
                <h1 style={{ marginTop: 10, color: "#F7673D" }}>Subtitle:</h1>
                <h2 style={{ textAlign: "center", fontFamily: "cursive" }}>{bookDetails.subtitle}</h2></>}
              <h1 style={{marginTop:10,color:"#F7673D"}}>Publishers:</h1>
                <h2 style={{textAlign:"center",fontFamily:"cursive"}}>{bookDetails.authors}</h2>
              <h1 style={{marginTop:10,color:"#F7673D"}}>Published on:</h1>
                <h2 style={{textAlign:"center",fontFamily:"cursive"}}>
                {bookDetails.published_date && bookDetails.published_date.split('T')[0]}</h2>
              <h1 style={{marginTop:10,color:"#F7673D"}}>Rating:</h1>
                <h2 style={{textAlign:"center",fontFamily:"cursive"}}>{bookDetails.rating}/5</h2>
              <h1 style={{marginTop:10,color:"#F7673D"}}>Max Readers:</h1>
                <h2 style={{textAlign:"center",fontFamily:"cursive"}}>{bookDetails.views}+</h2>
            </div>
            <div style={{textAlign:'center',alignContent:'center'}}>
              <DownloadButton onClick={()=>{handleDownload(bookDetails._id)}} >Download <FaDownload style={{paddingLeft:10}} /></DownloadButton>
              <ReadButton onClick={()=>{handleRead(bookDetails._id)}}>Read Online <FaBookReader style={{paddingLeft:10}}/></ReadButton>
            </div>
          </BooksContainer>
      </BookContainer>
    </BookMainContainer>
  )
};

export default BookDetails;
