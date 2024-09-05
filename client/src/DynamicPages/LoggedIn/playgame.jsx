import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // For getting game ID from the URL
import SignedInHeader from '../../reusable/SignedInHeader';
import Leftprofile from './subprofile/leftprofile'; // Import left profile component
import venue from '../../reusable/venues.json'
const Playgame = () => {
    const { id } = useParams(); // Get game ID from the URL
    const [gameDetails, setGameDetails] = useState(null);
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
                console.log(data)
                setGameDetails(data); // Assuming the API returns a game object
            })
            .catch(error => {
                console.error('Error fetching game details:', error);
            });
    }, [id]);

    
    return (
        <>
            <SignedInHeader />
            <div className="LargeDivider">
                <Leftprofile />

                    {
                    !gameDetails? <p>Loading game details...</p>
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

                    {/* Players Info */}
                    <div className="players-info">
                        <h3>Players</h3>
                        <div className="teams">
                            <div className="team light">
                                <h4>Light Tees ({gameDetails.applicants.length}/{gameDetails.team_limit})</h4>
                                {gameDetails.applicants.map((player, index) => (
                                    <p key={index}>{player.name} - {player.position || 'Not set'}</p>
                                ))}
                            </div>
                            <div className="team dark">
                                <h4>Dark Tees ({gameDetails.applicants.length}/{gameDetails.team_limit})</h4>
                                {gameDetails.applicants.map((player, index) => (
                                    <p key={index}>{player.name} - {player.position || 'Not set'}</p>
                                ))}
                            </div>
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
