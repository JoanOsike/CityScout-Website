import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import './LoginSignUp.css';

const LoginSignUp = ({ setUser }) => {
  
  useEffect(() => {
    document.title = "Login / Sign Up";
  }, []);

  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({ username: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const apiEndpoint = action === "Sign Up" 
      ? "http://localhost:3001/api/users/register" 
      : "http://localhost:3001/api/users/login";
  
    if (action === "Sign Up") {
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }
    } else {
      if (!formData.username || !formData.password) {
        alert("Please fill in all fields.");
        return;
      }
    }
  
    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        if (action === "Login") {
          alert(data.message);
          localStorage.setItem("token", data.token); // Save token for authentication
          setUser(formData.username);
          navigate("/selection");
        } else {
          alert(data.message);
          setAction("Login");
        }
      } else {
        alert(data.error);
      }
    } catch (error) {
      alert("An error occurred. Please try again later.");
    }
  
    setFormData({ username: "", password: "", confirmPassword: "" });
  };
  

  const continueAsGuest = () => {
    setUser(null);
    navigate('/selection');
  };

  return (
    <div className="container">
      <div className="title">Welcome to CityScout</div>
      <p className="description">
        CityScout is your go-to web app for discovering the best places to visit based on 
        your city, budget, and interests. Whether you're in the mood for a cafe, museum,
        park, restaurant, games, or a club, CityScout tailors recommendations to match your preferences.
      </p>
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
      </div>

      <div className="submit-container">
        <div className={action === "Login" ? "submit gray" : "submit"} onClick={() => setAction("Sign Up")}>
          Sign Up Page
        </div>
        <div className={action === "Sign Up" ? "submit gray" : "submit"} onClick={() => setAction("Login")}>
          Login Page
        </div>
      </div>
      
      <form className="inputs" onSubmit={handleSubmit}>
      <div className="input">
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={formData.username}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="input">
          <input
            type='password'
            name='password'
            placeholder='Password'
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        {action === "Sign Up" && (
          <div className="input">
            <input
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
          </div>
        )}
        <div className="buttons">
          <button type="submit" className="create-button">
          {action === "Login" ? "Login" : "Create Account"}
          </button>
        </div>


      </form>

      <div className="buttons">
        <button className="create-button" style={{ marginTop: "20px" }} onClick={continueAsGuest}>
        Continue as Guest
        </button>
      </div>


    </div>
  );
};

export default LoginSignUp;
