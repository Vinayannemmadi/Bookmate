import styled from "styled-components";

export const DownloadedMainContainer=styled.div`
    height:100%;
    min-height:100vh;
    margin-top:0px;
    padding:0px;
    display:flex;
    justify-contenet:center;
    flex-direction:column;
`;
export const DownloadedContainer=styled.div`
    min-height:100vh;
    margin-left:20vw;
    margin-top:150px;
    display:flex;
    justify-content:center;
    @media (max-width:768px){
        width:100vw;
        margin-left:0px;
    };
`;