import { Link } from "react-router-dom";
import styled from "styled-components";

export const HomeBox=styled.div`
    display:flex;
`;

export const SideBar=styled.div`
    display:none;
    min-height:100vh;
    height:100%;
    postion:fixed;
    @media(min-width:768px)
    {
        display:flex;
        margin-top:102px;
        width:20vw;
        position:fixed;
        padding:0px;
        flex-direction:column;
        background-color:#265073;
        z-index:1000;
        box-shadow: 6px 5px 10px rgba(0, 0, 0, 0.9);
    };
`;
export const Menubar=styled.div`
    display:flex;
    flex-direction:column;
    position:fixed;
    top:0;
    z-index:1001;
    width:300px;
    height:100vh;
    @media(max-width:768px){
        width:70vw;
    }
`;
export const ItemsContainer=styled.div`
    min-height:100vh;
    height:100%;
    width:84vw;
    margin-top:14vh;
    margin-left:20vw;
    // background-color: #333;
    color: #fff;
    @media (max-width:768px){
        width:100vw;
        margin-left:0vw;
        margin-top:12vh;
    };
`;
export const SearchBox=styled.div`
    width:350px;
    height:35px;
    border-radius:6px;
    border:2px solid #333;
    margin:20px auto;
    display:flex;
    justify-content:center;
    align-items:center;
    @media(max-width:768px){
        width:80vw;
    }
`;

export const InputField=styled.input`
    width:295px;
    height:33px;
    border-radius:5px 0px 0px 5px;
    border-shadow:none;
    border:none;
    @media(max-width:768px){
        width:80vw;
    }
`;
export const ButtonSearch=styled.button`
    width:50px;
    height:35px;
    border-shadow:none;
    border-radius:0px 5px 5px 0px;
    align-items:center;
    border:none;
    background-color:white;
    &:hover{
        cursor:pointer;
    }
`;

export const Elements=styled.div`
    list-style: none;
    padding: 0;
    margin: 0;
    position:relative;
`;
export const StyledLinkContainer=styled.div`
width:100%;
margin-top:20px;
height:40px;

&:hover{
    background-color:#2D9596;
    color:black;
  }
`;
export const StyledLink=styled.a`
text-decoration:none;
color: white;
padding-top:10px;
cursor: pointer;
margin-left:15px;
display:flex;
text-align:center;
font-family:monospace;
font-size:18px;

&:hover {
  color:black;
}
`
export const BooksContainer=styled.div`
    display:flex;
    align-items:center;
    margin-top:50px;
    color:black;
    margin-left:30px;
    margin-right:20px;
    justify-content:space-around;
    flex-wrap:wrap;
`;

export const ImagesContainer=styled.div`
    width:240px;
    height:400px;
    background-color:;
    border-radius:4px;
    padding-top:10px;
    padding-left:12px;
    padding-right:12px;
    display:flex;
    flex-direction:column;
    align-items:center;
    margin-bottom:16px;
    position:relative;
    border:1px solid gray;
    &:hover{
        cursor:pointer;
    }
`;

export const StyledImage=styled.img`
    width:200px;
    height:250px;
    border-radius:4px;
`;
export const CostLikeContainer=styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    width:80%;
    margin-bottom:10px;
    position:absolute;
    bottom:0;
`;

export const LikeButton=styled.button`
    background:none;
    border:none;
    background-color:bluegreen;
    &:hover{
        transform:scale(1.2);
        
    }
`;
export const CostButton=styled.button`

    border:none;
    background-color:bluegreen;
    &:hover{
        transform:scale(1.2);
        
    }
`;