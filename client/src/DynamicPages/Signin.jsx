import React from 'react';

const SignIn = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    console.log({
      email: email.value,
      password: password.value,
    });
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
    </div>
    </div>
  );
};

export default SignIn;
