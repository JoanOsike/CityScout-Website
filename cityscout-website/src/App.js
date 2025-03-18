import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSignUp from './frontend/LoginSignUp/LoginSignUp';
import SelectionPage from './frontend/SelectionPage';
import FavoritePage from './frontend/FavoritePage';
import ResultPage from './frontend/ResultPage';

function App() {
  const [user, setUser] = useState(null);

  // Load the user from localStorage when the app initializes
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  // Save the user to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', user);
    } else {
      localStorage.removeItem('user'); // Clear storage on logout
    }
  }, [user]);

  return (
    <Routes>
      <Route path="/" element={<LoginSignUp setUser={setUser} />} />
      <Route path="/selection" element={<SelectionPage user={user} />} />
      <Route path="/results" element={<ResultPage user={user}/>} />
      <Route path="/favorite" element={<FavoritePage user={user} />} /> {/* Pass user here */}
    </Routes>
  );
}

export default App;