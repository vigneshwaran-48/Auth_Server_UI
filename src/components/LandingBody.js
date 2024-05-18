import React from 'react'
import LandingBox from './LandingBox';
import { LandingPageData } from '../utility/LandingPageBodyData';

const LandingBody = () => {

    const landingBoxElems = LandingPageData.map(data => {
        return (
            <LandingBox 
                key={`landing-page-box-${data.id}`} 
                src={data.src}
                content={data.content}
                title={data.title}
                alignLeft={data.alignLeft}
            />
        )
    });

    return (
        <div className="landing-main y-axis-flex">
            { landingBoxElems }
        </div>
    )
}

export default LandingBody;
