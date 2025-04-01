import React, { useState, useEffect } from 'react';
import venue from '../../../../reusable/venues.json';
import { useNavigate } from 'react-router-dom';
import SignedInHeader from '../../../../reusable/SignedInHeader';
import Leftprofile from '../leftprofile';
const StartGame = () => {
    const [venues, setVenues] = useState(venue);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const venuesPerPage = 5; // Number of venues per page
    const navigate=useNavigate()    



    // Filtering venues based on the search query
    const filteredVenues = venues.filter(venue => {
        const searchQuery = search.toLowerCase();
        return (
            venue.name.toLowerCase().includes(searchQuery) ||
            venue.address.toLowerCase().includes(searchQuery) ||
            venue.postcode.toLowerCase().includes(searchQuery)
        );
    });

    // Pagination logic
    const indexOfLastVenue = currentPage * venuesPerPage;
    const indexOfFirstVenue = indexOfLastVenue - venuesPerPage;
    const currentVenues = filteredVenues.slice(indexOfFirstVenue, indexOfLastVenue);

    const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);

    const handleNextPage = () => {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
    };
    useEffect(() => {
    }, [currentPage]);

    return (
        <>
        <SignedInHeader />
        <div className='LargeDivider'>
          <Leftprofile />
        <div className="venue-container">
            <h1 className="venue-header">Pick a Venue</h1>
            <input 
                type="text" 
                className="venue-search" 
                placeholder="Search..." 
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1); // Reset to first page on search
                }}
            />
            <ul className="venue-list">
                {currentVenues.map((venue, index) => (
                    <li key={index} className="venue-list-item" onClick={()=>navigate(`/confirm/${venue.id}`)} >
                        <h3>{venue.name}</h3>
                        <p>{venue.address}</p>
                        <p>{venue.postcode}</p>
                    </li>
                ))}
            </ul>
            <div className="venue-pagination">
                <button 
                    className="venue-pagination-button" 
                    onClick={handlePreviousPage} 
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="venue-pagination-info">
                    Page {currentPage} of {totalPages}
                </span>
                <button 
                    className="venue-pagination-button" 
                    onClick={handleNextPage} 
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
        </div>
        </>
    );
};

export default StartGame;
