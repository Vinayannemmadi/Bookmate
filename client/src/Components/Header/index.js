import React, { useState,useEffect } from 'react'
import { IoMdMenu } from "react-icons/io";
import {NavbarContainer,NavbarLink,MenubarItems,MenubarIcon,Heading} 
  from './styledcomponents'
import { SideMenu,SideMenuItem,SideMenuItems,SideMenuItemContainer } from './styledcomponents';
import Cookies from "universal-cookie";
import { ImCross } from "react-icons/im";
import { useNavigate }  from "react-router";
import { useLocation } from 'react-router';
import { BsFire } from "react-icons/bs";
import { FaDownload } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { IoMdStopwatch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { FaExclamation } from "react-icons/fa";
import { MdOutlineContactSupport } from "react-icons/md";
import { IoHome } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoMdLogIn } from "react-icons/io";
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate=useNavigate();
  const [logName,setLogName]=useState('Login');
  const [isSideMenuOpen,setSideMenuOpen]=useState(false);
  const location=useLocation();
  const cookies=new Cookies();
  const token=cookies.get('jwtToken');
  useEffect(() => {
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwtToken');

    if (jwtToken) {
      setLogName('Logout');
    } else {
      setLogName('Login');
    }

    
  }, [location.pathname]);

  const handleLog=()=>{
    if(logName==='Login'){
        setSideMenuOpen(false);
        navigate('/login', { replace: true 
        });
        // navigate('/login');
        return 'Logout'
    }
    else{
      setLogName('Login');
      const cookies=new Cookies();
      cookies.remove('jwtToken');
      return 'Login';
    }
  };
//Routing to different pages...
  const routing=(route)=>{
        if(!token){ 
            toast.error(`Login to see ${route}`);
            return;
        }
        else{
          setSideMenuOpen(false);
            navigate(`/${route}`);
        }
  };
  return (
    <NavbarContainer>
      <>
      <Heading href='/' >
        BookMate</Heading>
      <MenubarItems>
        <NavbarLink href="/">Home</NavbarLink>
        <NavbarLink href="/about">About</NavbarLink>
        <button style={{border:'none',color:'white',
          background:'none',marginRight:10, 
          cursor:"pointer",
          fontSize:17,textAlign:'center' }}
          onClick={handleLog}
          href="/login">{logName}</button>
      </MenubarItems>
      <MenubarIcon>
          <IoMdMenu size={34} style={{cursor:'pointer'}}
          onClick={(m)=>{setSideMenuOpen(true)}}/>
      </MenubarIcon> 
      </>
      <SideMenu open={isSideMenuOpen}>
        <SideMenuItems>
          <ImCross style={{display:'flex',justifyContent:'flex-start',marginBottom:20,
          marginTop:20,marginLeft:'auto',marginRight:20,cursor:'pointer',
            alignItems:'flex-end'}} onClick={()=>setSideMenuOpen(false)}/>
          <SideMenuItemContainer>
            <SideMenuItem onClick={() => routing('')}><IoHome/> Home</SideMenuItem>
          </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={() => routing('newbooks')}><BsStars/> New Books</SideMenuItem>
          </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={() => routing('trending')}><BsFire/> Trending</SideMenuItem>
          </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={() => routing('mostread')}><IoMdStopwatch/> Most Read</SideMenuItem>
          </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={() => routing('liked')}><FaHeart/> Liked</SideMenuItem>
          </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={() => routing('downloads')}><FaDownload/> Downloads</SideMenuItem>
          </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={handleLog}>
                {logName==='Login'? <IoMdLogIn/>:<IoMdLogOut/>} {logName}</SideMenuItem>
          </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={() => navigate('/about')}><FaExclamation/> About</SideMenuItem>
          </SideMenuItemContainer>
          <SideMenuItemContainer>
              <SideMenuItem onClick={() => navigate('/contact')}><MdOutlineContactSupport/><span> </span> Contact</SideMenuItem>
          </SideMenuItemContainer>
        </SideMenuItems>
      </SideMenu>
    </NavbarContainer>
  );
};

export default Navbar;
