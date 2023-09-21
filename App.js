import React, { useEffect }  from "react";
import { BrowserRouter, Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements } from "react-router-dom";

import "./css/index.css";

import 'font-awesome/css/font-awesome.min.css';
import Login  from "./components/Login";
import Credentials  from "./pages/Credentials";
import SignUp from "./components/SignUp";
import Error404 from "./components/Error404";
import Landing from "./pages/Landing";


const routes = createBrowserRouter(createRoutesFromElements(
    <Route path="/">
        <Route index element={<Landing />} />
        <Route path="oauth" element={<Credentials />}>
            <Route index element={<Login />} />
            <Route path="sign-up" element={<SignUp />} />
        </Route>
        <Route path="*" element={<Error404 />} />
    </Route>
))

const App = () => {

    return (
        <RouterProvider router={routes} />
    )
}

export default App;