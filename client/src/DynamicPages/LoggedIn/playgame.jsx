import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import SignedInHeader from '../../reusable/SignedInHeader';
import Leftprofile from './subprofile/leftprofile';
import venue from '../../reusable/venues.json';

const Playgame = () => {
    const { id } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`http://localhost:3000/game/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
        .then(res => res.json())
        .then(data => setGameDetails(data))
        .catch(error => console.error('Error fetching game details:', error));
    }, [id]);

    const handleJoinTeam = async (teamIndex) => {
        try {
            const res = await fetch('http://localhost:3000/jointeam', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ gameId: id, teamIndex })
            });
            
            if (res.ok) {
                const updatedGame = await res.json();
                setGameDetails({ ...gameDetails, teams: updatedGame.teams });
            } else {
                const errorData = await res.json();
                console.log('Error joining team:', errorData.message);
                alert(errorData.message);
            }
        } catch (error) {
            console.error('Error joining team:', error);
        }
    };

    return (
        <>
            <SignedInHeader />
            <div className="LargeDivider">
                <Leftprofile />
                {!gameDetails ? <p>Loading game details...</p> : (
                    <div className="game-details-container">
                        <h2>{gameDetails.title} | {new Date(gameDetails.start_time).toLocaleTimeString()}</h2>
                        <div className="teams-info">
                            <h3>Teams</h3>
                            {gameDetails.teams.map((team, index) => (
                                <div key={index} className="team">
                                    <h4>{team.name} ({team.players.length}/{team.limit})</h4>
                                    <button onClick={() => handleJoinTeam(index)} disabled={team.players.length >= team.limit}>
                                        {team.players.length < team.limit ? 'Join Team' : 'Team Full'}
                                    </button>
                                    <ul>
                                        {team.players.map((player, playerIndex) => (
                                            <li key={playerIndex}>{player.name}</li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default Playgame;
