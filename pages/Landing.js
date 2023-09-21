import React from 'react';
import "../css/landing.css";
import LandingTopContainer from '../components/LandingTopContainer';
import LandingBody from '../components/LandingBody';
import LandingFooter from '../components/LandingFooter';

 const Landing = () => {
  return (
    <div className="landing-page">
        <LandingTopContainer />
        <LandingBody />
        <LandingFooter />
    </div>
  )
}

export default Landing;