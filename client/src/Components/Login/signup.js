import React, { useState } from 'react'
import { LoginContainer,LoginMainContainer, Page ,Input,Button,Label,Form} from './styledLogin'
import axios from 'axios';
import { useNavigate } from 'react-router';
export default function Signup() {
      const navigate=useNavigate();
      const [username,setUsername]=useState('');
      const [email,setEmail]=useState('');
      const [password,setPassword]=useState('');
      const [error,setError]=useState();
     
    const handleSubmit = async(event) => {
        event.preventDefault();
        try{

            const data = await axios.post('http://localhost:5000/api/auth/signup',{
                username:username, 
                email:email,
                password:password
            });
            console.log("data:::",data);
            if(!data){
                console.log(data.messge);
            }
            navigate('/login');
        }
        catch(er){
            console.log("error occured",er.response.data);
            const {message}= er.response.data;
            setError(message);
        }
        
        
      };

  return ( 
    <LoginMainContainer>
        <LoginContainer>            
            <Page>
                <Form onSubmit={handleSubmit}>
                    <Label>Username:</Label><br/>
                    <Input 
                        type="text" required={true}
                        name='username'
                        placeholder='Enter your Username..'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}>
                    </Input><br/>
                    <Label>Email:</Label><br/>
                    <Input 
                        type="email" required={true}
                        name='email'
                        placeholder='Enter your Email..'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}>
                    </Input><br/>
                    <Label>Password:</Label><br/>
                    <Input
                        type='password' required={true}
                        name='password'
                        placeholder='Enter your Password..'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}>
                    </Input><br/>
                    {error && <div style={{backgroundColor:'#a09fa6',
                    display:'flex',justifyContent:'center',
                    alignItems:'center',borderRadius:5,padding:5}}>
                        
                        <h5 style={{textAlign:'center', color:'red',margin:'auto'}}>{error}</h5>
                        <button style={{border:'none',marginLeft:12,marginRight:8,
                        background:'none',color:'green',fontWeight:"bold",
                        cursor:'pointer'}} onClick={()=>setError('')}>X</button></div>}
                    <Button>Signup</Button>
                   
                </Form>
            </Page>
        </LoginContainer>   
    </LoginMainContainer>
    
    )
}
