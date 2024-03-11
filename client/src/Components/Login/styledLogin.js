import styled from "styled-components";

export const Page=styled.div`
  height:440px;
  width:370px;
  display:flex;
  align-items:center;
  justify-content:center;
  border-radius:5px;
  background-color:#2D9596;
  box-shadow:6px 6px 10px (0,0,0,0.8);
  box-shadow: 5px 6px 10px rgba(0, 0, 0, 1);
  @media(max-width:768px){
    width:70%;
  }
`;
export const Form = styled.form`
  width:60%;
  @media(max-width:768px){
        width:70%;
    }
`;
export const Input=styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  width:100%;
  height:28px;
  margin-top:2px;
  margin-bottom:10px;
  cursor:text;
`;
export const Button = styled.button`

  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  padding-top:10px;
  padding-bottom:10px;
  width:100%;
  margin-top:10px;
  transition: background-color 0.3s;
  &:hover {
    background-color:#265073;
  }
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const LoginMainContainer=styled.div`
    height:100%;
    min-height:100vh;
    margin-top:0px;
    padding:0px;
    display:flex;
    justify-contenet:center;
    flex-direction:column;
`;

export const LoginContainer=styled.div`
    min-height:100vh;
    margin-left:20vw;
    margin-top:150px;
    display:flex;
    justify-content:center;
    @media (max-width:768px){
        width:100%;
        margin-left:0px;
    };
`;

// Styled components
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const FormContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;



const FormGroup = styled.div`
  margin-bottom: 20px;
`;



// const Input = styled.input`
//   padding: 10px;
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   outline: none;
// `;



export {Container,FormContainer,FormGroup};