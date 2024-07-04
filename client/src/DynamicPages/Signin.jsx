import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  const navigate=useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
console.log(email.value,password.value)
    try {
        const response = await fetch('http://localhost:3000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email: email.value,password: password.value })
        });
  
        const data = await response.json();
  
        console.log(data)
        if (response.ok) {
          localStorage.setItem('token', data.token);
          console.log(data.token)
          alert('Login successful!');
        } else {
          setError(data.message || 'An error occurred');
        }
      } catch (error) {
        setError('An error occurred');
      }
    };
  
  return (
    <div className='container'>
                    <img src="../StockImgs/pexels-cottonbro-7236368.jpg" alt="Pitch 1" className='signinimg'/>
    <div className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type="email" name="email" className="auth-input" placeholder='email' required />
        
        <input type="password" name="password" className="auth-input" placeholder='password' required />
        
        <button type="submit" className="redButton">Submit</button>
      </form>
      <p style={{marginBlock:'10px',fontWeight:'lighter'}}>Don't an account?</p>
        <button className="grayButton" style={{background:'white',color:'red',width:'100%'}}
        onClick={()=>navigate('/signup')}
        >Sign up</button>
    </div>
    </div>
  );
};

export default SignIn;
