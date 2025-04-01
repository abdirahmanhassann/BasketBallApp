import React, { useContext, useEffect, useState } from 'react'
import { NavContext } from '../../../reusable/NavContext';
import venue from '../../../reusable/venues.json';
import { useNavigate } from 'react-router-dom';
function Home() {
    const { userInfo , setUserInfo } = useContext(NavContext);
const [upcomingMatches, setUpcomingMatches] = useState([]);
 const email=localStorage.getItem('token')
 const navigate=useNavigate()
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
      if(data.error){
        alert(data.error)
        navigate('/login')
      }

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
        <div className="games">
  <h2>My Matches</h2>
  <h4>Follow players and organisers to keep up to date with upcoming matches</h4>
  <div className="games-list">
    { upcomingMatches && upcomingMatches.map((game, index) => (
      <>
      <p1>{ new Date(game.start_time).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })}</p1>
      
      <div key={index} className="game-item"  onClick={()=>navigate(`/games/${game.id}`)}>
                                    <div className="game-time">
                                        {new Date(game.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </div>
                                    <div className="game-details">
                                        <div className="game-title">{venue[game.venue_id]?.name}</div>
                                        <div className="game-info">{game.title}</div>
                                        <div className="game-tags">
                                            {game.tags.split(',').map((tag, idx) => (
                                                <div key={idx} className="game-tag">#{tag}</div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="game-price-players">
                                        <div className="game-price" style={{fontWeight:'bold',fontSize:'13px',color:'#4e4e4e'}}>
                                            £{Number.isInteger(game.amount) ? `${game.amount}.00` : game.amount}</div>
                                        <div className="game-players" style={{ background: 'lightgray' }}>
                                            {game.applicants ? game.applicants.length : 0}/{game.team_limit}
                                        </div>
                                    </div>
                                </div>
                                </>
                            ))}
  </div>
</div>
      ) : null}
    </div>
  )
}

export default Home
