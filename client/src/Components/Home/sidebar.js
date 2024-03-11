import React from 'react'
import { SideBar,Elements, StyledLink,StyledLinkContainer } from './homestyled';
import { BsFire } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { IoMdStopwatch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import Cookies from 'universal-cookie';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';
const SideBarContainer=()=> {
  const cookies=new Cookies();
  const token=cookies.get('jwtToken');
  const navigate=useNavigate();
  
  const handleRouting=(route)=>{
    if(!token){ 
      toast.error(`Login to see ${route}`);
      return;
  }
  else{
      navigate(`/${route}`);
  }
  };

  return (
    <div>
        <SideBar>
            <Elements>
              <StyledLinkContainer>
                <StyledLink onClick={()=>handleRouting('newbooks')}><BsStars/> New</StyledLink>
              </StyledLinkContainer>
              <StyledLinkContainer>
                <StyledLink onClick={()=>handleRouting('trending')}><BsFire/> Trending</StyledLink>
              </StyledLinkContainer>
              <StyledLinkContainer>
                <StyledLink onClick={()=>handleRouting('mostread')}><IoMdStopwatch/> Most Read</StyledLink>
              </StyledLinkContainer>
              <StyledLinkContainer>
                <StyledLink onClick={()=>handleRouting('downloads')}><FaDownload/> Downlaods</StyledLink>
              </StyledLinkContainer>
              <StyledLinkContainer>
                <StyledLink onClick={()=>handleRouting('liked')}><FaHeart/> Liked</StyledLink>
              </StyledLinkContainer>
            </Elements>
        </SideBar>
    </div>
  )
}
export default SideBarContainer;
