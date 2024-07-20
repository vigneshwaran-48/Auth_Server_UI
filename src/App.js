import React, { useEffect }  from "react";
import { Navigate, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import "./css/index.css";

import 'font-awesome/css/font-awesome.min.css';
import Login  from "./components/Login";
import Credentials  from "./pages/Credentials";
import SignUp from "./components/SignUp";
import { Common } from "./utility/Common";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import  Accounts, { accountsLoader } from "./pages/Accounts";
import Home, { homeLoader } from "./components/Home";
import PersonalInfo, { 
    personalInfoAction,
    personalInfoLoader }  
from "./components/PersonalInfo";
import DeveloperConsole, { developerLoaderData }  from "./components/DeveloperConsole";
import ListApps, { listAppsAction, listAppsLoader }  from "./components/developer-console/ListApps";
import CreateApp, { createAppAction }  from "./components/developer-console/CreateApp.js";
import { AppProvider } from "./AppProvider";
import ClientAppSingleView, { clientAppSingleViewAction, clientAppSingleViewLoader } from "./components/developer-console/ClientAppSingleView";
import Loading from "./utility/Loading";
import ErrorComp from "./utility/ErrorComp";
import Error404 from "./utility/Error404";
import Landing from "./pages/Landing.js";
import Consent, { consentLoaderData } from "./components/Consent.js";



const routes = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
        <Route path="welcome" element={<Landing />} />
        <Route path="oauth" element={<Credentials />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
            <Route path="consent" element={<Consent />} loader={consentLoaderData} />
        </Route>
        <Route path="" element={<Accounts />} loader={accountsLoader}>
            <Route 
                index 
                element={<Home />} 
                loader={homeLoader}   
                errorElement={<ErrorComp />}     
            />
            <Route
                path="personal-info" 
                element={<PersonalInfo />}
                loader={personalInfoLoader}
                action={personalInfoAction}
                errorElement={<ErrorComp />}
            />
            <Route 
                path="developer-console" 
                element={<DeveloperConsole />}
                loader={developerLoaderData}
                errorElement={<ErrorComp />}
            >
                <Route index element={<Navigate to="list" />} />
                <Route 
                    path="list" 
                    element={<ListApps />}
                    loader={listAppsLoader}
                    action={listAppsAction}
                    errorElement={<ErrorComp />}
                />
                <Route 
                    path="list/:id" 
                    element={<ClientAppSingleView />}
                    loader={clientAppSingleViewLoader}
                    action={clientAppSingleViewAction}
                    errorElement={<ErrorComp />}
                />
                <Route 
                    path="create" 
                    element={<CreateApp />}
                    action={createAppAction}
                    errorElement={<ErrorComp />}
                />
                <Route path="*" element={<Error404 />} />
            </Route>
        </Route>
        <Route path="*" element={<Error404 />} />
    </Route>
))

const App = () => {

    useEffect(() => {
        window.addEventListener("click", event => {
            const { id } = event.target;
            Common.getCloseOnFocusOutElems().forEach(elem => {
                if(id !== elem.id) {
                    if(!elem.additionalCheckElems || !elem.additionalCheckElems.includes(id)) {
                        elem.closeElem();
                    }
                }
            });
        }, false)
    }, []);

    return (
        <AppProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <React.Suspense fallback={<Loading />}>
                    <RouterProvider router={routes} />
                </React.Suspense>
            </LocalizationProvider>
        </AppProvider>
    );
}

export default App;