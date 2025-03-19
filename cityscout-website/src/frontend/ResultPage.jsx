//Result Page: get outputs to put back into result page
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Header from "./Header";
import "./style/ResultPage.css";

const ResultPage = ({ user }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const recommendations = location.state?.recommendations || [];
    const [favorites, setFavorites] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        if (message) {
            alert(message);
            setMessage(""); 
        }
    }, [message]);

    useEffect(() => {
        console.log("📝 Updated Favorites List:", favorites); // Debugging
    }, [favorites]);

    const handleAddToFavorites = async (place) => {
        if (!user) {
            setMessage("Please log in to add to favorites.");
            return;
        }
    
        // Toggle favorite state in the frontend
        if (favorites.some(favorite => favorite.Name === place.Name)) {
            //setFavorites(favorites.filter(favorite => favorite.Name !== place.Name));
            setMessage("Place saved in favorites.");
            return;
        }
    
        try {
            const response = await fetch("http://localhost:3001/api/favorites/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username: user, // Send the username from the user prop
                    name: place.Name,
                    category: place.Category,
                    street_address: place["Street Address"],
                    city: place.City,
                    province: place.Province,
                    contacts: JSON.stringify(place.Contacts), // Convert contacts to a JSON string
                }),
            });
            const data = await response.json();
    
            if (response.ok) {
                
                setFavorites(favorites.concat(place));
                setMessage(data.message || "Place added to favorites.");
            } else {
                setMessage(data.message || "Failed to add to favorites.");
            }
        } catch (err) {
            setMessage("An error occurred while adding to favorites.");
        }
    };
    
    console.log("📩 Received recommendations:", recommendations); // Debugging

    return (
        <>
        <Header user={user} />
        <h1>Results Page</h1>

        {recommendations.length > 0 ? (
            <div className="results-container">
            <h2>Suggested Locations:</h2>
            
            {recommendations.map((place, index) => (
                
                <div key={index} className="result-item">
                
                <h3>{place.Name}</h3>
                <p><strong>Category:</strong> {place.Category}</p>
                <p><strong>Address:</strong> {place["Street Address"]}, {place.City}, {place.Province}</p>
                <p><strong>Phone:</strong> {place.Contacts.Phone}</p>
                <p><strong>Website:</strong> <a href={place.Contacts.Website} target="_blank" rel="noopener noreferrer">{place.Contacts.Website}</a></p>
                <button 
                className="add-favorite-btn" 
                onClick={()=>handleAddToFavorites(place)}>
                {favorites.some(favorite => favorite.Name === place.Name) ? "Saved in Favorites" : "Add to Favorites"}</button>
                </div>
            ))}
            </div>
            
        ) : (
            <p>No recommendations found.</p>
        )}

        <button className="back-button" onClick={() => navigate("/selection")}>Go Back</button>
        </>
    );
};

export default ResultPage;
