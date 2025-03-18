//header
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './style/Header.css';

const Header = ({ user }) => {
  const location = useLocation();

  return (
    <div className="header-nav">
      <div className="logo">
        CityScout
      </div>
      <div className="welcome-msg">
        {user ? (
          <p>Welcome, {user}! </p>
        ) : (
          <p>Welcome, You're in guest mode.</p>
        )}
      </div>

      <div className="nav-link">
        {user ? (
          <>
            {location.pathname === '/selection' && (
              <Link to="/favorite">Go to Favorite Page</Link>
            )}
            {location.pathname === '/favorite' && (
              <Link to="/selection">Go to Selection Page</Link>
            )}
            {
                <Link to="/">Logout</Link>
            }
          </>
        ) : (
          location.pathname === '/selection' && (
            <Link to="/">Login / Sign Up</Link>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
