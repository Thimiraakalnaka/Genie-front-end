import React, { useState } from 'react'
import './login.css'

export default function AdminLogin() {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const handleonchange = (e) =>{
        e.preventDefault();
        
    }

  return (
    <div className='container'>
        <div className='form'>
        <h1>ADMIN LOGIN</h1>
        <div className='content'>
            <label>E mail</label>
            <input type='email' value={email} onChange={handleonchange}/>
        </div>
        <div className='content'>
            <label>Password</label>
            <input type='password' value={password} onChange={handleonchange}/>
        </div>
        <div className='content'>
            <button>Login</button>
        </div>
    </div>
    </div>
  )
}
