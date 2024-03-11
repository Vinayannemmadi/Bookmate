
import React, { useState, useEffect } from 'react';
import { IoMdMenu } from "react-icons/io";
import styled from 'styled-components';
import Cookies from "universal-cookie";
import { useNavigate, useLocation } from "react-router-dom";

const NavbarContainer = styled.nav`
  background-color: #333;
  color: white;
  padding: 1rem;
`;

const NavbarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const NavbarLogo = styled.a`
  text-decoration: none;
  color: white;
  font-size: 1.5rem;
`;

const NavbarMenu = styled.ul`
  list-style: none;
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavbarMenuItem = styled.li`
  padding: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #555;
  }
`;

const SideMenu = styled.div`
  position: fixed;
  top: 0;
  right: ${({ open }) => (open ? '0' : '-100%')}; /* Adjusted to slide in from right */
  width: 250px;
  height: 100%;
  background-color: #222;
  transition: right 0.3s ease-in-out; /* Adjusted transition */
`;

const SideMenuItems = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const SideMenuItem = styled.li`
  padding: 1rem;
  color: white;
  cursor: pointer;
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [logName, setLogName] = useState('Login');
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);

  useEffect(() => {
    const cookies = new Cookies();
    const jwtToken = cookies.get('jwtToken');

    if (jwtToken) {
      setLogName('Logout');
    } else {
      setLogName('Login');
    }
  }, [location.pathname]); // Update when location.pathname changes

  const handleLog = () => {
    console.log('clicked login or logout button');
    if (logName === 'Login') {
      navigate('/login');
    } else {
      setLogName('Login');
      const cookies = new Cookies();
      cookies.remove('jwtToken');
      navigate('/');
    }
  }

  const toggleSideMenu = () => {
    setIsSideMenuOpen(!isSideMenuOpen);
  };

  return (
    <NavbarContainer>
      <NavbarWrapper>
        <NavbarLogo href="/">Hola Website</NavbarLogo>
        <NavbarMenu>
          <NavbarMenuItem><a href="/">Home</a></NavbarMenuItem>
          <NavbarMenuItem><a href="/about">About</a></NavbarMenuItem>
        </NavbarMenu>
        <button style={{ border: 'none', color: 'white', background: 'none', marginRight: 10, cursor: "pointer", fontSize: 17, textAlign: 'center' }} onClick={handleLog}>{logName}</button>
        <IoMdMenu size={34} onClick={toggleSideMenu} />
      </NavbarWrapper>
      <SideMenu open={isSideMenuOpen}>
        <SideMenuItems>
          <SideMenuItem onClick={() => navigate('/')}>Home</SideMenuItem>
          <SideMenuItem onClick={() => navigate('/about')}>About</SideMenuItem>
          {/* Add more side menu items as needed */}
        </SideMenuItems>
      </SideMenu>
    </NavbarContainer>
  );
};

export default Navbar;

