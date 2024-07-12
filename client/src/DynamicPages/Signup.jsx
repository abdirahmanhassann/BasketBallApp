import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const navigate=useNavigate()
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { username,firstname,lastname,email, password,repassword } = event.target.elements;
    if(password.value!==repassword.value){
      repassword.value=''
        return alert('The passwords have to be same')
    }
console.log(
    // email.value,
    // password.value,
    lastname.value
   // repassword.value,
    //firstname.value,
    //lastname.value
  )

  try {
        const response = await fetch('http://localhost:3000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
             username:username.value,
            firstname:firstname.value
            ,lastname:lastname.value
            ,email: email.value
            ,password: password.value })
        });
  
        const data = await response.json();
  
        console.log(data.token)
        if (response.ok) {
          localStorage.setItem('token', data.token);
          console.log(data.token)
          alert('Login successful!');
        }

        else {
          setError(data.message || 'An error occurred');
        alert('Username or Email already exists')
        }
      } catch (error) {
        console.log(error)
        setError('An error occurred');
      }
    };
  
  return (
    <div className='container'>
                    <img src="../StockImgs/pexels-cottonbro-7236368.jpg" alt="Pitch 1" className='signinimg'/>
    <div className="auth-container">
      <h2 className="auth-title">Sign In</h2>
      <form onSubmit={handleSubmit} className="auth-form">
        <input type='text' name="username" className="auth-input" placeholder='Username' required />
        <input type='text' name="firstname" className="auth-input" placeholder='First name' required />
        <input type='text' name="lastname" className="auth-input" placeholder='Last name' required />
        <input type="email" name="email" className="auth-input" placeholder='Email' required />
        
        <input type="password" name="password" className="auth-input" placeholder='Password' required />
        <input type="password" name="repassword" className="auth-input" placeholder='Re-enter password' required />
        
        <button type="submit" className="redButton">Submit</button>
      </form>
        <p style={{marginBlock:'10px',fontWeight:'lighter'}}>Already have an account?</p>
        <button className="grayButton" style={{background:'white',color:'red',width:'100%'}}
        onClick={()=>navigate('/signin')}
        >Login</button>
    </div>
    </div>
  );
};

export default SignUp;
