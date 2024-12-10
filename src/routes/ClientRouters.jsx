import React from 'react';
import Rentedmovies from '../pages/client/Home/Rentedmovies'; 
import Main from '../pages/client/Main/Main';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Promotion from  '../pages/client/Home/Promotion'
import Blog from '../pages/client/Home/Blog';
import Support from '../pages/client/Support/Support';
function ClientRouters(props) {
    const routes = [
        { path: "/", element: <Main /> },
        { path: "/Home/Rentedmovies", element: <Rentedmovies /> },
        { path: "/Home/Promotion", element: <Promotion /> },
        { path: "/Home/Blog", element: <Blog /> },
        { path: "/Support/Support", element: <Support /> },

    ];
    return (
            <Routes>
                {routes.map((route, index) => (
                    <Route key={index} path={route.path} element={route.element} />
                ))}
            </Routes>
    );
}

export default ClientRouters;
