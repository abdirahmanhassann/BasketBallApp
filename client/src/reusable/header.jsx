import React from 'react'
import GoogleButton from 'react-google-button'

function Header() {
    
    function navigate(url){
        window.location.href=url
    }

    async function auth(){
        console.log('clicked')
        const response=await fetch ('http://127.0.0.1:3000/req',{method:'post'})
        const data=await response.json()
        navigate(data.url)
    }
  return (
    <header className="header">
    <h1>Basketball Addicts</h1>
    <nav className="nav">
      <a href="/">Home</a>
      <a href="/">About</a>
      <a href="/">Play Football</a>
      <a href="/">Impact</a>
      <a href="/">Contact</a>
    </nav>
    <div className='buttonDiv'>
      <button className='grayButton'>Register</button>
    <GoogleButton  onClick={()=>auth()}/>
    </div>
  </header>
  )
}

export default Header