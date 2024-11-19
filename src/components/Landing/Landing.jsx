import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <main className="landing-main">
      <div className="text-content">
        <h1>Welcome to Kitchen Whispers</h1>
        <h3>Your Recipe Sharing Community!</h3>
        <h4>
          Join Kitchen Whispers to discover new recipes, share your favorites, 
          and connect with other food lovers. Let's cook, share, and inspire together!
        </h4>
        <Link to="/signup" className="join-button">Join Now</Link>
      </div>
      <div className="landing-image"></div>
    </main>
  );
};

export default Landing;
