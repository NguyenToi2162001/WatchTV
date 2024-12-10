import React from 'react';
import { IoMdMail } from "react-icons/io";
import { FaSearch, FaBell } from "react-icons/fa";
import AdminRouters from '../../../routes/AdminRouters';
import { useAuth } from "../../../context/AuthsProvider";
import { useState, useContext } from 'react';
import {ContextSignUps} from "../../../context/SignUpProvider"
function Main(props) {
    const { logout ,user} = useAuth();
    const handleLogout = () => {
        logout(); // Xóa thông tin đăng nhập
    };
    const [showMenu, setShowMenu] = useState(false);

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }
    return (

        <main className='flex-1 p-4'>
            <header className='flex justify-between items-center mb-6'>
                <div>
                    <h2 className='text-4xl text-gray-400'>Good Morning, <span className='text-4xl text-black ms-2 font-bold'>John Doe</span></h2>
                    <h3 className='text-xl  text-gray-400 ms-2'>Your performance summary this week</h3>
                </div>
                <div className='flex items-center '>
                    <FaSearch className='w-[25px] h-[25px]' />
                    <IoMdMail className='w-[25px] h-[25px] ms-2' />
                    <FaBell className='w-[25px] h-[25px] ms-2' />
                    <div className="ms-2 relative">
                        <img
                            className="w-[50px] h-[50px] rounded-[50%] cursor-pointer"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBgubqzveGfonqnt4XHQEuglmkeHwfzfSInQ&s"
                            alt="Profile"
                            onClick={toggleMenu}
                        />
                        {showMenu && (
                            <div className="absolute w-40 top-15 right-0 mt-2 bg-slate-600 shadow-lg p-2 rounded">
                                <p className="text-white">{user.role}</p>
                                <p className="text-white">{user.username}</p>
                                <button
                                    className="text-red-500 hover:underline"
                                    onClick={handleLogout}
                                >
                                        Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <AdminRouters />
        </main>
    );
}

export default Main;