import React from 'react';
import Actor from '../pages/admin/cast_crew/Actor';
import Author from '../pages/admin/cast_crew/Author';
import Character from '../pages/admin/cast_crew/Character';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import Categories from '../pages/admin/categories/Categories';
import Comment from '../pages/admin/engagement_pages/Comment';
import Like from '../pages/admin/engagement_pages/Like';
import WatchList from '../pages/admin/engagement_pages/WatchList';
import AdminDashboard from '../pages/admin/home_admin/AdminDashboard';
import Main from '../pages/admin/home_admin/Main';
import Menu from '../pages/admin/home_admin/Menu';
import Episode from '../pages/admin/media_management/Episode';
import Movie from '../pages/admin/media_management/movies/Movie';
import Trailer from '../pages/admin/media_management/Trailer';
import Profile from '../pages/admin/profile/Profile';
import UsersPages from '../pages/admin/users_pages/UsersPages';
import Package from '../pages/admin/vip/Package';
import Peature from '../pages/admin/vip/Peature';
import Plans from '../pages/admin/vip/Plans';
import UserManager from '../pages/admin/usermanager/UserManager';
import {Route, Routes } from 'react-router-dom';
function AdminRouters(props) {
    const routes = [
        { path: "/" ,element : <Dashboard/>},
        { path: "/categories/categories", element: <Categories/> },
        { path: "/engagement_pages/Comment", element: <Comment/> },
        { path: "/engagement_pages/Like", element: <Like/> },
        { path: "/engagement_pages/WatchList", element: <WatchList/> },
        { path: "/home_admin/AdminDashboard", element: <AdminDashboard/> },
        { path: "/home_admin/Main", element: <Main/> },
        { path: "/home_admin/Menu", element: <Menu/> },
        { path: "/media_management/Episode", element: <Episode/> },
        { path: "/media_management/Movie", element: <Movie/> },
        { path: "/media_management/Trailer", element: <Trailer/> },
        { path: "/profile/Profile", element: <Profile/> },
        { path: "/users_pages/UsersPages", element: <UsersPages/> },
        { path: "/vip/Package", element: <Package/> },
        { path: "/vip/Peature", element: <Peature/> },
        { path: "/vip/Plans", element: <Plans/> },
        { path: "/cast_crew/Actor", element: <Actor/> },
        { path: "/cast_crew/Author", element: <Author/> },
        { path: "/cast_crew/Character", element: <Character/> },
        { path: "/usermanager/UserManager", element: <UserManager/> },
    ]
    return (
        <Routes>      
            {routes.map((route,index) =>(
                <Route key={index} path={route.path} element={route.element} />
            ))
            }
        </Routes>
    );
}

export default AdminRouters;