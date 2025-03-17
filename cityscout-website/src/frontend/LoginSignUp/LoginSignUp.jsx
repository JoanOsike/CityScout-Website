import React, { useState } from "react";
import './LoginSignUp.css';

const LoginSignUp = () => {
  const [action, setAction] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: ""
  });

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
      localStorage.setItem(formData.username, formData.password);
      alert("Account created successfully! Please login.");
      setAction("Login");
    } else {
      const storedPassword = localStorage.getItem(formData.username);
      if (!storedPassword) {
        alert("Username does not exist.");
        return;
      }
      if (storedPassword !== formData.password) {
        alert("Incorrect password.");
        return;
      }
      alert(`Welcome back, ${formData.username}!`);
    }

    setFormData({ username: "", password: "", confirmPassword: "" });
  };

  return (
    <div className="container">
      <div className="header">
        <div className="text">{action}</div>
        <div className="underline"></div>
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

        <button type="submit" className="submit-btn">
          {action === "Login" ? "Login" : "Create Account"}
        </button>
      </form>

      <div className="submit-container">
        <div
          className={action === "Login" ? "submit gray" : "submit"}
          onClick={() => setAction("Sign Up")}
        >
          Sign Up
        </div>

        <div
          className={action === "Sign Up" ? "submit gray" : "submit"}
          onClick={() => setAction("Login")}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;