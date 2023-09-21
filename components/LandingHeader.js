import React from 'react'
import { Link } from 'react-router-dom';

const LandingHeader = () => {
  
    return (
        <header className="landing-header x-axis-flex">
            <div className="header-content-wrapper x-axis-flex">
                <img src="app-icon.png" alt="app-icon" />
                <nav className="landing-top-nav x-axis-flex">
                    <Link to="oauth">LogIn</Link>
                    <Link to="oauth/sign-up">Sign Up</Link>
                </nav>
            </div>
        </header>
    )
}

export default LandingHeader;
