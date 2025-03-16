import React, { useContext, useEffect, useState } from 'react'
import { NavContext } from '../../../reusable/NavContext';

function Home() {
    const { userInfo , setUserInfo } = useContext(NavContext);
const [upcomingMatches, setUpcomingMatches] = useState([]);
 const email=localStorage.getItem('token')

  useEffect(()=>{

    function fetchUpcomingMatches() {
      fetch('http://127.0.0.1:3000/getUserUpcomingMatches', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email:email})
      })
      .then(res=>res.json())
      .then(data=>{
      console.log('data for upcoming matches',data)
      setUpcomingMatches(data)
      })
      .catch(err=>console.log(err))  
      
    }
    function home(){
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
    setUserInfo(data)
    })
    .catch(err=>console.log(err))
  }

    fetchUpcomingMatches();
    home();
  },[])
  return (
    <div>
      {userInfo && userInfo.user ? (
        <>
          <p>welcome back {userInfo.user.firstname} {userInfo.user.lastname}.</p>
          <div style={{ textAlign: 'center' }}>
            <h3>
              Follow players and organisers to keep up to date with upcoming matches
            </h3>
            {upcomingMatches && upcomingMatches.length > 0 ? upcomingMatches.map( (match) => <div> {match.id} </div>) : (
              <button className='redButton'>
                Play basketball matches
              </button>
            )}
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Home
