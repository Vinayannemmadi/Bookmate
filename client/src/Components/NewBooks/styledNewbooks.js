import styled from "styled-components";

export const LikedMainContainer=styled.div`
    height:100%;
    min-height:100vh;
    margin-top:0px;
    padding:0px;
    display:flex;
    justify-contenet:center;
    flex-direction:column;
    caret-color: transparent;
`;

export const LikedContainer=styled.div`
min-height:100vh;
margin-left:20vw;
margin-top:150px;

@media (max-width:768px){
    width:100%;
    margin-left:0px;
};
`;
export const BooksContainer=styled.div`
    display:flex;
    align-items:center;
    margin-top:50px;
    color:black;
    margin-left:30px;
    margin-right:20px;
    margin-bottom:40px;
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
