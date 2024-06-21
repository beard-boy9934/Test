import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";


const Login=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    const navigate=useNavigate();
    useEffect=()=>{
        const auth=localStorage.getItem('user')
        if(auth)
        {
            navigate('/')
        }
    }
    const handleLogin=async()=>{
        let result=await fetch('http://localhost:5000/login', {method:'post',
         body:JSON.stringify({email,password}),
         headers:{'Content-Type':'application/json'},

        });
        result=await result.json();
        if(result)
        {
            localStorage.setItem("user",JSON.stringify(result));
            navigate('/')
        }
        else
        {
            alert("Please Enter correct Detail")
        }
        // localStorage.setItem("user",JSON.stringify(result));
        // navigate('/')
    }
    return (
        <div className="register">
            <h1>Login</h1>
            <input className="inputBox" type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter Your Email"/>
            <input className="inputBox" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder="Enter Your Password"/>
            <button  onClick={handleLogin} className="appbutton" type="button">Login</button>
        </div>
    )
}
export default Login