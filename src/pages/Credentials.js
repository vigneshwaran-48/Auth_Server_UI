import React from "react";
import { Outlet, useLocation } from "react-router";

const Credentials = () => {

    const location = useLocation();

    const isConsentPage = location.pathname === "/oauth/consent";

    return (
        <div className="credential-page x-axis-flex">
            {
                !isConsentPage ? <div className="credential-left-part y-axis-flex"></div> : ""
            }
            <div className={`credential-right-part y-axis-flex ${isConsentPage ? "full-width" : ""}`}>
                <Outlet />
            </div>
        </div>
    )
}

export default Credentials;