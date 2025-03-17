import React, {useEffect} from 'react';
import Header from './Header';

const FavoritePage = ({ user }) => {
  useEffect(() => {
    document.title = "Favourite Page";
  }, []);
  return (
    <div>
      <Header user={user} />
    <div className="container">
      <h1>Favorite Page</h1>
      {/* Add your favorite items logic here */}
    </div>
    </div>
  );
};

export default FavoritePage;
