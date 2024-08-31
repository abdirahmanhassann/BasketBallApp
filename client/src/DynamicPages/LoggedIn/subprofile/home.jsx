import React, { useContext, useEffect, useState } from 'react'
import { NavContext } from '../../../reusable/NavContext';

function Home() {
    const [userInfo1,setUserInfo1]=useState('')
    const { userInfo , setUserInfo } = useContext(NavContext);

 const email=localStorage.getItem('token')

  useEffect(()=>{
    fetch('http://127.0.0.1:3000/home', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:email})
    })
    .then(res=>res.json())
    .then(data=>{

    console.log(data)
    setUserInfo1(data)
    setUserInfo(data)
    })
    .catch(err=>console.log(err))
  },[])
  return (
    <div>
      
        <p>welcome back {userInfo1.user? userInfo1.user.firstname + ' ' + userInfo1.user.lastname : '...'}.</p>
        <div style={{textAlign:'center'}}>
     <h3>
          Follow players and organisers to keep up to date with upcoming matches
        </h3>
        <button className='redButton'>
            Play basketball matches
        </button>
        </div>
    </div>
  )
}

export default Home