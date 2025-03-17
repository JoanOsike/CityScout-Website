import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionPage = ({ user }) => {
  useEffect(() => {
    document.title = "Selection Page";
  }, []);

  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Selection Page</h1>
      {user && (
        <button onClick={() => navigate('/favorite')}>
          Go to Favorite Page
        </button>
      )}
      {!user && <p>You're currently in guest mode.</p>}
    </div>
  );
};

export default SelectionPage;
