import React,{useState} from 'react';
import { LoginContainer,LoginMainContainer, Page ,Input,Button,Label,Form} from './styledLogin'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie'
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
    const history = useNavigate();

    const [username,setUsername]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    // const [email,setEmail]=useState('');

    const handleSubmit = async(event) => {
        event.preventDefault();
        if(!event.target.password==='' || event.target.username.value===''){
            toast.error("You are login successfully");
            setError("Please enter both username and password");
            return;
        }
        const cookies=new Cookies();
        try{
                const {data} = await axios.post('http://localhost:5000/api/auth/signin',{
                    username:username, 
                    email:username,
                    password:password
                });
                
                toast.success("You are login successfully");
                cookies.set('jwtToken',data);
                history('/');
        }
        catch(err){
            console.log();
            toast.error(err.response.data);
            setError('Username/Password is invalid!');

            return ;
        }
        setUsername('');
        setPassword('');
        history('/');  
    };

return (
    <LoginMainContainer>
        <LoginContainer>            
        <ToastContainer/>
            <Page>
                <Form onSubmit={handleSubmit}>
                    <Label>Username/Email:</Label><br/>
                    <Input 
                        type="text" required={true}
                        name='username'
                        value={username}
                        onChange={(e)=>setUsername(e.target.value)}>
                    </Input><br/>
                    <Label>Password:</Label><br/>
                    <Input
                        type='password' required={true}
                        name='password'
                        onChange={(e)=>setPassword(e.target.value)}
                        value={password}>
                    </Input><br/>
                    {error && <div style={{backgroundColor:'#a09fa6',
                    display:'flex',justifyContent:'center',alignItems:'center',borderRadius:5}}>
                        <h5 style={{textAlign:'center', color:'red',margin:'auto',padding:8}}>{error}</h5>
                        
                        <button style={{marginLeft:12,marginRight:10,
                        background:'none',color:'green',fontWeight:"bold",
                        cursor:'pointer'}} onClick={()=>setError('')}>X</button></div>}
                    <Button>Login</Button>
                    <p>Don't have account?  <Link to='/register' style={{color:'blue'}}>  
                    Register</Link></p>
                </Form>
            </Page>
        </LoginContainer>
    </LoginMainContainer>
  )
}


