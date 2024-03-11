import styled from "styled-components";

export const HomeBox=styled.div`
    display:flex;
    font-family: 'Poppins', sans-serif;
    color:black;
    @media(max-width:768px){
        flex-direction:column;
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

