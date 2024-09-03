import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import v from '../../../../reusable/venues.json';
import SignedInHeader from '../../../../reusable/SignedInHeader';
import Leftprofile from '../leftprofile';
const ConfirmChoice = () => {
    const [id, setId] = useState();
    const [venue, setVenue] = useState();

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

    return (
        <>
        <SignedInHeader />
        <div className='LargeDivider'>
          <Leftprofile />

        <div className="startgame-container">
            {venue ? (
                <>
                    <h1>Start a game ({venue.name})</h1>
                    <form className="startgame-form">
                        <div className="startgame-form-group">
                            <label>Title</label>
                            <input type="text" name="title" required />
                        </div>
                        <div className="startgame-form-group">
                            <label>Description</label>
                            <textarea name="description" required />
                        </div>
                        <div className="startgame-form-group">
                            <label>Tags</label>
                            <input type="text" name="tags" placeholder="Type # and your tag" />
                        </div>
                        <div className="startgame-form-group">
                            <label>Pitch</label>
                            <select name="pitch">
                                <option value="">Select pitch</option>
                                {/* Add pitch options here */}
                            </select>
                        </div>
                        <div className="startgame-form-group">
                            <label>Start at</label>
                            <input type="date" name="date" required />
                            <input type="time" name="time" required />
                        </div>
                        <div className="startgame-form-group">
                            <label>
                                <input type="checkbox" name="private" /> Private (Only invited players can join)
                            </label>
                        </div>
                        <div className="startgame-form-group">
                            <label>
                                <input type="checkbox" name="indoor" /> Indoor
                            </label>
                        </div>
                        <div className="startgame-form-group">
                            <label>
                                <input type="checkbox" name="training" /> Training session
                            </label>
                        </div>
                        <div className="startgame-form-group">
                            <label>
                                <input type="checkbox" name="applications" /> Accept facilitator/host applications
                            </label>
                        </div>
                        <div className="startgame-form-group">
                            <label>Team players limit</label>
                            <select name="team_limit">
                                <option value="5">5 a side</option>
                                <option value="7">7 a side</option>
                                <option value="11">11 a side</option>
                            </select>
                        </div>
                        <div className="startgame-form-group">
                            <label>Gender options</label>
                            <label>
                                <input type="radio" name="gender" value="coed" defaultChecked /> Co-ed
                            </label>
                            <label>
                                <input type="radio" name="gender" value="women" /> Women
                            </label>
                            <label>
                                <input type="radio" name="gender" value="men" /> Men
                            </label>
                        </div>
                        <div className="startgame-form-group">
                            <label>Payment</label>
                            <label>
                                <input type="radio" name="payment" value="online" defaultChecked /> Online
                            </label>
                            <label>
                                <input type="radio" name="payment" value="cash" /> Cash
                            </label>
                            <label>
                                <input type="radio" name="payment" value="free" /> Free
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
