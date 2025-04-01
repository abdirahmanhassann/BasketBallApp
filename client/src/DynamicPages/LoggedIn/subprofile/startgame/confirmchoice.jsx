import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import v from '../../../../reusable/venues.json';
import SignedInHeader from '../../../../reusable/SignedInHeader';
import Leftprofile from '../leftprofile';

const ConfirmChoice = () => {
    const [id, setId] = useState();
    const [venue, setVenue] = useState();
    const [teams, setTeams] = useState([{ name: "Team 1", players: 5 }, { name: "Team 2", players: 5 }]); // Default teams
    const token = localStorage.getItem('token');
    const navigate = useNavigate(); // For redirection after form submission
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        pitch: '',
        date: '',
        time: '',
        private: false,
        indoor: false,
        training: false,
        applications: false,
        team_limit: '5',
        gender: 'coed',
        payment: 'online',
        amount: '',
    });

    useEffect(() => {
        const currentUrl = window.location.href; 
        const urlParts = currentUrl.split('/');
        const extractedId = urlParts[urlParts.length - 1];
        setId(extractedId);
        setVenue(v[extractedId]);
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [id]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    // Handle the number of teams input
    const handleNumberOfTeamsChange = (e) => {
        const numTeams = parseInt(e.target.value);
        const newTeams = Array.from({ length: numTeams }, (_, i) => ({
            name: `Team ${i + 1}`,
            players: 5, // Default number of players
        }));
        setTeams(newTeams);
    };

    // Handle players per team input
    const handlePlayersPerTeamChange = (index, value) => {
        const newTeams = [...teams];
        newTeams[index].players = value;
        setTeams(newTeams);
    };

    // Handle team name changes
    const handleTeamNameChange = (index, value) => {
        const newTeams = [...teams];
        newTeams[index].name = value;
        setTeams(newTeams);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate required fields
        if (!formData.title || !formData.description || !formData.date || !formData.time) {
            alert("Please fill in all required fields.");
            return;
        }

        // Prepare data to send
        const dataToSend = {
            ...formData,
            venue: v[id],
            token: token,
            teams: teams, // Include teams data in the submission
        };

        try {
            const response = await fetch('http://localhost:3000/creategame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData: formData, token: token, venue: venue, teams: teams })
            });

            if (response.ok) {
                alert('Game created successfully!');
                navigate('/games');
            } else {
                const errorData = await response.json();
                alert(`Failed to create game: ${errorData.message}`);
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
        }
    };

    return (
        <>
            <SignedInHeader />
            <div className='LargeDivider'>
                <Leftprofile />

                <div className="startgame-container">
                    {venue ? (
                        <>
                            <h1>Start a game ({venue.name})</h1>
                            <form className="startgame-form" onSubmit={handleSubmit}>
                                {/* Existing form fields */}
                                <div className="startgame-form-group">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="startgame-form-group">
                                    <label>Description</label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                
                                {/* Number of Teams */}
                                <div className="startgame-form-group">
                                    <label>Number of Teams</label>
                                    <input
                                        type="number"
                                        value={teams.length}
                                        onChange={handleNumberOfTeamsChange}
                                        min={2}
                                        max={10}
                                        required
                                    />
                                </div>

                                {/* Team Names and Players per Team */}
                                {teams.map((team, index) => (
                                    <div key={index} className="startgame-form-group">
                                        <label>Team {index + 1} Name</label>
                                        <input
                                            type="text"
                                            value={team.name}
                                            onChange={(e) => handleTeamNameChange(index, e.target.value)}
                                        />
                                        <label>Players per Team</label>
                                        <input
                                            type="number"
                                            value={team.players}
                                            onChange={(e) => handlePlayersPerTeamChange(index, e.target.value)}
                                            min={1}
                                            max={20}
                                        />
                                    </div>
                                ))}

                                {/* Continue with the existing form (date, time, etc.) */}
                                <div className="startgame-form-group">
                                    <label>Start at</label>
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        onChange={handleChange}
                                        required
                                    />
                                    <input
                                        type="time"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                {/* Conditionally render amount input based on selected payment option */}
                                {(formData.payment === 'cash' || formData.payment === 'online') && (
                                    <div className="startgame-form-group">
                                        <label>Amount per person</label>
                                        <input
                                            type="number"
                                            name="amount"
                                            value={formData.amount}
                                            onChange={handleChange}
                                            placeholder="Enter amount"
                                            required
                                        />
                                    </div>
                                )}

                                <button type="submit" className="startgame-submit">Create Game</button>
                            </form>
                        </>
                    ) : (
                        <p>Loading venue details...</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ConfirmChoice;
