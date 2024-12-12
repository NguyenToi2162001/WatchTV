import React from 'react';
import Rentedmovies from '../pages/client/Home/Rentedmovies';
import Main from '../pages/client/Main/Main';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Promotion from '../pages/client/Home/Promotion'
import Blog from '../pages/client/Home/Blog';
import Support from '../pages/client/Support/Support';
import Account from '../pages/client/Acount/Account';
import AccountInfo from '../pages/client/Acount/AccountInfo';
import LibraryManagement from '../pages/client/Acount/LibraryManagement';
import Subcription from '../pages/client/Acount/Subcription';
import Offer from '../pages/client/Acount/Offer';
function ClientRouters(props) {
    return (
        <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/Home/Rentedmovies" element={<Rentedmovies />}></Route>
            <Route path="/Home/Promotion" element={<Promotion />}></Route>
            <Route path="/Home/Blog" element={<Blog />}></Route>
            <Route path="/Support/Support" element={<Support />}></Route>
            <Route path="/Acount/Account" element={<Account />}>
                <Route path="info" element={<AccountInfo />} />
                <Route path="library" element={<LibraryManagement />} />
                <Route path="subscription" element={<Subcription />} />
                <Route path="offer" element={<Offer />} />
                <Route path="home" element={<Main />} />
            </Route>
        </Routes>
    );
}

export default ClientRouters;
