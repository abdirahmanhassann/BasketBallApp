import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For getting game ID from the URL
import SignedInHeader from '../../reusable/SignedInHeader';
import Leftprofile from './subprofile/leftprofile'; // Import left profile component
import venue from '../../reusable/venues.json';

const Playgame = () => {
    const { id } = useParams(); // Get game ID from the URL
    const [gameDetails, setGameDetails] = useState(null);
    const [selectedTeam, setSelectedTeam] = useState(null); // Track selected team to join
    const token = localStorage.getItem('token');

    useEffect(() => {
        // Fetch game details from backend
        fetch(`http://localhost:3000/game/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setGameDetails(data); // Assuming the API returns a game object
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
            });
    }, [id]);

    const handleJoinTeam = (teamIndex) => {
        // Handle joining a team (teamIndex represents the index of the selected team)
        setSelectedTeam(teamIndex);
        fetch(`http://localhost:3000/game/join`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ token, gameId: id, teamIndex }) // Send the selected team index and token to the backend
        })
            .then(response => response.json())
            .then(data => {
                console.log('Joined team:', data);
                // You might want to refresh the game details to reflect the changes in team members
            })
            .catch(error => {
                console.error('Error joining team:', error);
            });
    };

    return (
        <>
            <SignedInHeader />
            <div className="LargeDivider">
                <Leftprofile />

                {
                    !gameDetails ? <p>Loading game details...</p>
                        :

                        <div className="game-details-container">
                            <h2>{gameDetails.title} | {new Date(gameDetails.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h2>

                            {/* Game Info */}
                            <div className="game-info-section">
                                <h3 className='game-strong'>When and Where</h3>
                                <div>
                                    <p><strong className='game-strong'>Date:</strong> {new Date(gameDetails.start_time).toLocaleDateString('en-GB')}</p>
                                    <p><strong className='game-strong'>Time:</strong> {new Date(gameDetails.start_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                    <p><strong className='game-strong'>Venue:</strong> {venue[gameDetails.venue_id].name} ({venue[gameDetails.venue_id].address})</p>
                                    <p><strong className='game-strong'>Price:</strong> £{gameDetails.amount}</p>
                                </div>

                                <div className="game-tags">
                                    {gameDetails.tags.split(',').map((tag, index) => (
                                        <span key={index} className="game-tag">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            {/* Teams Section */}
                            <div className="teams-info">
                                <h3>Teams</h3>
                                <div className="teams-container">
                                    {gameDetails.teams.map((team, teamIndex) => (
                                        <div key={teamIndex} className="team">
                                            <h4>{team.name} ({team.players.length>0?team.players.length:0}/{team.players})</h4>
                                            <div className="team-players">
                                                {team.players.length > 0 ? (
                                                    team.players.map((player, index) => (
                                                        <div key={index} className="player">
                                                            <img src={player.picture || '../../../StockImgs/Userimg.png'} alt={player.name} className="player-avatar" />
                                                            <p>{player.name}</p>
                                                        </div>
                                                    ))
                                                ) : (
                                                    <div className="empty-player">
                                                        <img src={'../../../StockImgs/Userimg.png'} alt="empty slot" className="player-avatar" />
                                                        <p>+ Add player</p>
                                                    </div>
                                                )}
                                                {/* If team has empty slots, show placeholders */}
                                                {team.players.length < team.limit &&
                                                    Array.from({ length: team.limit - team.players.length }).map((_, idx) => (
                                                        <div key={idx} className="empty-player">
                                                            <img src={'../../../StockImgs/Userimg.png'} alt="empty slot" className="player-avatar" />
                                                            <p>+ Add player</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                            {/* Button to Join Team */}
                                            {team.players.length < team.limit ? (
                                                <button
                                                    className="join-team-btn"
                                                    onClick={() => handleJoinTeam(teamIndex)}
                                                    disabled={selectedTeam === teamIndex}
                                                >
                                                    {selectedTeam === teamIndex ? 'Joined' : 'Join Team'}
                                                </button>
                                            ) : (
                                                <span className="team-full-message">Team is full</span>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Game Organizer Info */}
                            <div className="game-organizer-info">
                                <h3>Organized by</h3>
                                <p>{gameDetails.organizer_name}</p>
                                <p>{gameDetails.organizer_contact}</p>
                            </div>

                            <div className="game-description">
                                <h3>Description</h3>
                                <p>{gameDetails.description}</p>
                            </div>
                        </div>
                }
            </div>
        </>
    );
};

export default Playgame;
