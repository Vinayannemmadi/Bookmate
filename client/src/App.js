import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from "./Components/Header";
import Home from "./Components/Home";
import SideBarContainer from "./Components/Home/sidebar";
import NewBooks from './Components/NewBooks/newbooks'
import Liked from "./Components/Liked/liked";
import MostRead from './Components/MostRead/mostread';
import Donwloaded from "./Components/Downloaded/downloaded";
import Trending from "./Components/Trending/trending";
import Login from "./Components/Login/login";
import Signup from "./Components/Login/signup";
import BookDetails from "./Components/BookDetails";
import About from "./Components/about/index";
import Contact from "./Components/contact";
class App extends Component {
  render() {
    return (

      <BrowserRouter>
          <Header/>
          <SideBarContainer/>
          <Routes>
            <Route  path="/" element={<Home />} />
            <Route path='/newbooks' element={<NewBooks/>}/>
            <Route path='/trending' element={<Trending/>}/>
            <Route path='/mostread' element={<MostRead/>}/>
            <Route path='/liked' element={<Liked/>}/>
            <Route path='/downloads' element={<Donwloaded/>}/>
            <Route path='/notfound' element={<Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/register' element={<Signup/>}/>
            <Route exact path='/about' element={<About/>}/>
            <Route exact path='/contact' element={<Contact/>}/>
            <Route exact path='/bookdetails/:id' element={<BookDetails/>}/>
            <Route render={()=> <Navigate to='/' replace />}/>
          </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
