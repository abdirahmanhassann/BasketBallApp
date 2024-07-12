import React from 'react'

function SignedInHeader() {
  return (
    <nav style={{background:'#d1002ae6'}} className='header'>
            <h1 style={{color:'white'}}>Basketball Addicts</h1>
    <nav className="nav" >
      <a href="/" style={{color:'white'}}>Home</a>
      <a href="/" style={{color:'white'}}>Games</a>
      <a href="/" style={{color:'white'}}>Venues</a>
      <a href="/" style={{color:'white'}}>Teams</a>
      </nav>
    <div className='buttonDiv'>
      <p style={{color:'white'}}>Player Name & Icon</p>
    {/* <GoogleButton  onClick={()=>login()}/> */}
    </div>
    </nav>
  )
}

export default SignedInHeader