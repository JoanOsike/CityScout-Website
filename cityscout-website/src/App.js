// App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginSignUp from './frontend/LoginSignUp/LoginSignUp';
import SelectionPage from './frontend/SelectionPage';
import FavoritePage from './frontend/FavoritePage';

function App() {
  const [user, setUser] = useState(null);

  return (
    <Routes>
      <Route path="/" element={<LoginSignUp setUser={setUser} />} />
      <Route path="/selection" element={<SelectionPage user={user} />} />
      <Route path="/favorite" element={<FavoritePage user={user} />} /> {/* Pass user here */}
    </Routes>
  );
}

export default App;