import React from 'react'
import LandingHeader from './LandingHeader';

const LandingTopContainer = () => {
    return (
        <div className="landing-top-container y-axis-flex">
            <LandingHeader />
            <div className="landing-top-text-container">
                <h1>We build Experience</h1>
                <p>Unlock a world of seamless access with OpenID 
                    – Your key to a simpler, more secure online experience</p>
            </div>
            <img 
                className="landing-top-back-image" 
                src="/secure.jpg" alt="lock"/>
        </div>
    )
}

export default LandingTopContainer;
