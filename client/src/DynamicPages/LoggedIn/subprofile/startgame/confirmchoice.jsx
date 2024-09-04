import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import v from '../../../../reusable/venues.json';
import SignedInHeader from '../../../../reusable/SignedInHeader';
import Leftprofile from '../leftprofile';
const ConfirmChoice = () => {
    const [id, setId] = useState();
    const [venue, setVenue] = useState();
    const token=localStorage.getItem('token')
    console.log(token);
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
        payment: 'online'
    });

    useEffect(() => {
        const currentUrl = window.location.href; // Get the full URL
        console.log("Current URL:", currentUrl);

        // Extract the last segment after '/' which is the id
        const urlParts = currentUrl.split('/');
        const extractedId = urlParts[urlParts.length - 1];
        setId(extractedId);
        console.log(id)
        setVenue(v[id]);
    }, [id]);
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
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
            token:token ,
        };

        try {
            const response = await fetch('http://localhost:3000/creategame', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({formData:formData,token:token,venue:venue})
            });

            if (response.ok) {
                alert('Game created successfully!');
                navigate('/profile/games');  // Redirect to games list or any other page
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
                                <div className="startgame-form-group">
                                    <label>Tags</label>
                                    <input
                                        type="text"
                                        name="tags"
                                        value={formData.tags}
                                        onChange={handleChange}
                                        placeholder="Type # and your tag"
                                    />
                                </div>
                                <div className="startgame-form-group">
                                    <label>Pitch</label>
                                    <select name="pitch" value={formData.pitch} onChange={handleChange}>
                                        <option value="">Select pitch</option>
                                        {/* Add pitch options here */}
                                    </select>
                                </div>
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
                                <div className="startgame-form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="private"
                                            checked={formData.private}
                                            onChange={handleChange}
                                        /> Private (Only invited players can join)
                                    </label>
                                </div>
                                <div className="startgame-form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="indoor"
                                            checked={formData.indoor}
                                            onChange={handleChange}
                                        /> Indoor
                                    </label>
                                </div>
                                <div className="startgame-form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="training"
                                            checked={formData.training}
                                            onChange={handleChange}
                                        /> Training session
                                    </label>
                                </div>
                                <div className="startgame-form-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            name="applications"
                                            checked={formData.applications}
                                            onChange={handleChange}
                                        /> Accept facilitator/host applications
                                    </label>
                                </div>
                                <div className="startgame-form-group">
                                    <label>Team players limit</label>
                                    <select
                                        name="team_limit"
                                        value={formData.team_limit}
                                        onChange={handleChange}
                                    >
                                        <option value="5">5 a side</option>
                                        <option value="7">7 a side</option>
                                        <option value="11">11 a side</option>
                                    </select>
                                </div>
                                <div className="startgame-form-group">
                                    <label>Gender options</label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="coed"
                                            checked={formData.gender === 'coed'}
                                            onChange={handleChange}
                                        /> Co-ed
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="women"
                                            checked={formData.gender === 'women'}
                                            onChange={handleChange}
                                        /> Women
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="men"
                                            checked={formData.gender === 'men'}
                                            onChange={handleChange}
                                        /> Men
                                    </label>
                                </div>
                                <div className="startgame-form-group">
                                    <label>Payment</label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="online"
                                            checked={formData.payment === 'online'}
                                            onChange={handleChange}
                                        /> Online
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="cash"
                                            checked={formData.payment === 'cash'}
                                            onChange={handleChange}
                                        /> Cash
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="payment"
                                            value="free"
                                            checked={formData.payment === 'free'}
                                            onChange={handleChange}
                                        /> Free
                                    </label>
                                </div>
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
