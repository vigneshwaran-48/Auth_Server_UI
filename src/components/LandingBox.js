import React from 'react'

const LandingBox = props => {

    const { alignLeft = true, content, src, title } = props;

    return (
        <div 
            className={`landing-main-box-container-wrapper 
                        x-axis-flex ${!alignLeft && "align-right"}`}>
            <div 
                className={`landing-main-box-container 
                            x-axis-flex ${!alignLeft && "align-content-right"}`}>
                <img src={src} alt="illutration" />
                <div className="landing-main-box-content">
                    <h2>{ title }</h2>
                    <p>{ content }</p>
                </div>
            </div>
        </div>
    )
}

export default LandingBox;
