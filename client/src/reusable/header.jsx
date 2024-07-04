import React from 'react'
import GoogleButton from 'react-google-button'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'
function Header() {
const navigate=useNavigate()    
    // function navigate(url){
    //     window.location.href=url
    // }

async function po(){
  const response=await fetch ('http://127.0.0.1:3000/po',{method:'GET',credentials: 'include' })
  const data=await response.json();
  console.log(await data)
}


    // async function auth(){
    //     console.log('clicked')
    //     const response=await fetch ('http://127.0.0.1:3000/req',{method:'POST',credentials:'include'})
    //     const data=await response.json()
    //     console.log(data)
    //     navigate(await data.url)
    //   }
    
    function login(){
      navigate('/signin')
    }
    function signup(){
      navigate('/signup')
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
      <button className='grayButton' onClick={()=>signup()}>Register</button>
      <button className='redButton' onClick={()=>login()}>Login</button>
    {/* <GoogleButton  onClick={()=>login()}/> */}
    </div>
  </header>
  )
}

export default Header