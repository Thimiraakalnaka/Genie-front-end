import React, { useState } from 'react'
import './login.css'
import Axios from 'axios';
import {useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function AdminLogin() {

    const[email,setEmail]=useState("");
    const[password,setPassword]=useState("");

    const navigate = useNavigate();

    const {login} = useAuth();

    const handleonchange = (e) =>{
        const { name, value } = e.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const loginData = {
            email,
            password
        }
        Axios.post('http://localhost:8080/api/v1/login', loginData)
            .then(res => {
                console.log(res.data);
                login();
                navigate('/dashboard');
            })
            .catch(err => {
                console.error(err);
            });
    }

  return (
    <div className='container'>
        <div className='form'>
        <h1>ADMIN LOGIN</h1>
        <div className='content'>
            <label>E mail</label>
            <input type='email' name='email' value={email} onChange={handleonchange}/>
        </div>
        <div className='content'>
            <label>Password</label>
            <input type='password' name='password' value={password} onChange={handleonchange}/>
        </div>
        <div className='content'>
            <button onClick={handleSubmit}>Login</button>
        </div>
    </div>
    </div>
  )
}