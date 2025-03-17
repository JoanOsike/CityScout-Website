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

  const handleSubmit = (e) => {
    e.preventDefault();

    if (action === "Sign Up") {
      if (formData.password.length < 6) {
        alert("Password must be at least 6 characters.");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match.");
        return;
      }

    // Clearly check if username already exists:
    if (localStorage.getItem(formData.username)) {
      alert("Username already exists! Please choose a different username.");
      return;
    }
    
      localStorage.setItem(formData.username, formData.password);
      alert("Account created successfully! Please login.");
      setAction("Login");
    } else {
      const storedPassword = localStorage.getItem(formData.username);
      if (!storedPassword || storedPassword !== formData.password) {
        alert("Incorrect username or password.");
        return;
      }
      setUser(formData.username);
      navigate('/selection');
    }

    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  const continueAsGuest = () => {
    setUser(null);
    navigate('/selection');
  };

  return (
    <div className="container">
      <div className="title">CityScout</div>
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
