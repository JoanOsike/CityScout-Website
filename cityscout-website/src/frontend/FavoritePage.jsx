import React, {useEffect} from 'react';

const FavoritePage = ({ user }) => {
  useEffect(() => {
    document.title = "Favourite Page";
  }, []);
  return (
    <div className="container">
      <h1>Favorite Page</h1>
      {user ? (
        <p>Welcome, {user}! These are your favorite items:</p>
      ) : (
        <p>Please log in to view your favorites.</p>
      )}
      {/* Add your favorite items logic here */}
    </div>
  );
};

export default FavoritePage;
