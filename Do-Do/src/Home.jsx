import React from 'react';
import { Link } from 'react-router-dom';
import './Styles/Home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <div className="content-wrapper">
        <h1>Welcome to Do-Do</h1>
        <p className="tagline">
          Your own personal assistant
        </p>
        <div className="button-group">
          <Link to="/login" className="btn login pulse">Login</Link>
          <Link to="/register" className="btn register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;