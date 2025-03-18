//Favorite Page: logged in user can add to favorite.
import React, { useState, useEffect } from "react";
import Header from './Header';

const FavoritePage = ({ user }) => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "Favourite Page";

    if (user) {
      fetchFavorites();
    }
  },[user]);

  const fetchFavorites = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`http://localhost:3001/api/favorites/${user}`);
      if (!response.ok) {
        throw new Error("Failed to fetch favorites.");
      }
      const data = await response.json();
      setFavorites(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteFavorite = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/favorites/${id}`, { method: "DELETE" });
      if (!response.ok) {
        throw new Error("Failed to delete favorite.");
      }
      setFavorites(favorites.filter((favorite) => favorite.id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  if (!user) {
    return (
      <div className="container">
        <h1>Favorite Page</h1>
        <p>Please log in to view your favorites.</p>
      </div>
    );
  }

  return (
    <div>
      <Header user={user} />
    <div className="container">
      <h1>Favorite Page</h1>
      <p>Welcome, {user}! These are your favorite items:</p>

      {loading ? (
        <p>Loading favorites...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : favorites.length === 0 ? (
        <p>You have no favorites yet.</p>
      ) : (
        <ul className="favorites-list">
          {favorites.map((favorite) => (
            <li key={favorite.id} className="favorite-item">
              <h3>{favorite.name}</h3>
              <p>Category: {favorite.category}</p>
              <p>Address: {favorite.street_address}, {favorite.city}, {favorite.province}</p>
              <p>Contacts: {Object.entries(favorite.contacts).map(([key, value]) => (
                <span key={key}>{key}: {value} </span>
              ))}</p>
     
              <button
                onClick={() => deleteFavorite(favorite.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default FavoritePage;