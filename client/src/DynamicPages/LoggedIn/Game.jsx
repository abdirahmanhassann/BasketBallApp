import React, { useState, useEffect } from 'react';
import SignedInHeader from '../../reusable/SignedInHeader';
import Leftprofile from './subprofile/leftprofile';
import venue from '../../reusable/venues';

const Games = () => {
    const [games, setGames] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const token = localStorage.getItem('token');

    useEffect(() => {
        function fetchGames(page) {
            fetch(`http://localhost:3000/games?page=${page}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token: token })
            })
                .then(data => data.json())
                .then(response => {
                    setGames(response.games);
                    setTotalPages(response.totalPages);
                    setCurrentPage(response.currentPage);
                })
                .catch(error => {
                    console.error('Error fetching games:', error);
                });
        }

        fetchGames(currentPage);
    }, [currentPage]);

    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Helper function to categorize games by day
    const categorizeGames = () => {
        const today = new Date().setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        const categorized = {
            today: [],
            tomorrow: [],
            upcoming: [],
        };

        games.forEach((game) => {
            const gameDate = new Date(game.start_time).setHours(0, 0, 0, 0);

            if (gameDate === today) {
                categorized.today.push(game);
            } else if (gameDate === tomorrow) {
                categorized.tomorrow.push(game);
            } else if (gameDate > tomorrow) {
                categorized.upcoming.push(game);
            }
        });

        return categorized;
    };

    const { today, tomorrow, upcoming } = categorizeGames();

    return (
        <>
            <SignedInHeader />
            <div className='LargeDivider'>
                <Leftprofile />

                <div className="games-list">
                    <h2>Upcoming Games</h2>

                    {today.length > 0 && (
                        <>
                            <h3>Today</h3>
                            {today.map((game, index) => (
                                <div key={index} className="game-item">
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
                            ))}
                        </>
                    )}

                    {tomorrow.length > 0 && (
                        <>
                            <h3>Tomorrow</h3>
                            {tomorrow.map((game, index) => (
                                <div key={index} className="game-item">
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
                            ))}
                        </>
                    )}

                    {upcoming.length > 0 && (
                        <>
                            {upcoming.map((game, index) => {
                    const currentGameDate = new Date(game.start_time).toLocaleDateString('en-GB', 
                    { day: '2-digit', month: '2-digit', year: '2-digit' });

                    const previousGameDate = index > 0 
                        ? new Date(upcoming[index - 1].start_time).toLocaleDateString('en-GB', 
                        { day: '2-digit', month: '2-digit', year: '2-digit' })
                            : null;
                            return (
                                <>
                                        <React.Fragment key={index}>
                    {index === 0 || currentGameDate !== previousGameDate ? (
                      <h3>{currentGameDate}</h3>
                    ) : null}

                                <div key={index} className="game-item">
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
                                   </React.Fragment>

                                </>
                            )})}
                        </>
                    )}

                    {today.length === 0 && tomorrow.length === 0 && upcoming.length === 0 && (
                        <p>No upcoming games found.</p>
                    )}

                    {/* Pagination Controls */}
                    <div className="pagination">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1}
                        >
                            Previous
                        </button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </>
        )
};

export default Games;
