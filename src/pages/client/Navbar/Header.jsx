import React, { useState, useContext } from 'react';
import { MdFormatAlignJustify } from "react-icons/md";
import { useAuth } from "../../../context/AuthsProvider";
import { Link } from "react-router-dom";
import { IoIosSearch } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";
import { HiLibrary } from "react-icons/hi";
import { FaUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import DialogLogin from './DialogLogin';
import DialogSignUp from './DialogSignUp';
import logo from "../../../assets/images/rim.png";

const inner = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    "role": ""
}
export default function Header() {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [openSignUp, setOpenSignUp] = useState(false);
    const [errors, setErrors] = useState(inner);
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const openMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
    const handleOpen = () => {
        setOpen(true);
        setOpenSignUp(false);
    };


    const handleOpenSignUp = () => {
        setOpenSignUp(true);
        setOpen(false);
        setErrors(inner);
    };

    const handleCloseSignUp = () => setOpenSignUp(false);
    const toggleMenu = () => {
        setShowMenu(!showMenu);
    }

    return (
        <>
            <DialogLogin open={open} handleOpenSignUp={handleOpenSignUp} setOpen={setOpen} setOpenSignUp={setOpenSignUp} ></DialogLogin>
            <DialogSignUp openSignUp={openSignUp} handleOpen={handleOpen} setOpen={setOpen} handleCloseSignUp={handleCloseSignUp}></DialogSignUp>
            <div className="flex justify-between items-center px-10 py-3 bg-gray-800 text-white">
                {/* Icon để mở menu trên mobile */}
                <MdFormatAlignJustify size={30} className='md:hidden w-20' onClick={openMenu} />
                {/* Logo */}
                <div className="flex items-center">
                    <img className="w-16 h-16" src={logo} alt="Logo" />
                </div>
                {/* Menu trên desktop (luôn hiển thị) */}
                <div className={`flex-1 md:flex hidden`}>
                    <div className='flex list-none space-x-8 ms-4'>
                        <Link to={"/"}>
                            <li className="hover:text-gray-400 cursor-pointer">Trang Chủ</li>
                        </Link>
                        <Link to="/Home/Rentedmovies">
                            <li className="hover:text-gray-400 cursor-pointer">Phim Thuê</li>
                        </Link>
                        <Link to="/Home/Promotion">
                            <li className="hover:text-gray-400 cursor-pointer">Khuyến Mãi</li>
                        </Link>
                        <Link to="/Home/Blog">
                            <li className="hover:text-gray-400 cursor-pointer"> Blog</li>
                        </Link>
                        <Link to="/Support/Support">
                            <li className="hover:text-gray-400 cursor-pointer"> Support</li>
                        </Link>
                    </div>
                </div>
                {/* Menu trên mobile (ẩn khi chưa bấm icon, hiển thị khi bấm icon) */}
                <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} absolute top-16 left-0 w-full bg-gray-800 z-20 list-none`}>
                    <div className="flex flex-col items-center py-4 space-y-4">
                        <Link to={"/"}>
                            <li className="hover:text-black hover:bg-slate-100 cursor-pointer py-2 w-full text-center">Trang Chủ</li>
                        </Link>
                        <Link to="/Home/Rentedmovies">
                            <li className="hover:text-black hover:bg-slate-100 cursor-pointer py-2 w-full text-center">Phim Thuê</li>
                        </Link>
                        <Link to="/Home/Promotion">
                            <li className="hover:text-black hover:bg-slate-100 cursor-pointer py-2 w-full text-center">Khuyến Mãi</li>
                        </Link>
                        <Link to="/Home/Blog">
                            <li className="hover:text-black hover:bg-slate-100 cursor-pointer py-2 w-full text-center">Blog</li>
                        </Link>
                        <Link to="/Support/Support">
                            <li className="hover:text-black hover:bg-slate-100 cursor-pointer py-2 w-full text-center">Hỗ Trợ</li>
                        </Link>
                    </div>
                </div>
                {/* Button Đăng Nhập */}
                <div>
                    {user ? (
                        <div className="flex items-center">
                            <Link to="/Detail/Packagemovie"><button className='bg-amber-400  px-2 py-1 rounded-md text-white hover:bg-amber-800 text-sm' > ĐĂNG KÝ GÓI</button></Link>
                            <IoIosSearch size={20} style={{ color: 'white', marginLeft: '10px' }} />

                            <div className="ms-2 relative  group menu-container">
                                <div className='flex items-center menu-trigger'>
                                    <img
                                        src={user.imgUrl}
                                        alt="User Avatar"
                                        className="w-8 h-8 rounded-full mr-2 ms-2" />
                                    <FaChevronDown onClick={toggleMenu} />
                                </div>

                                <div
                                    className="absolute hidden group-hover:block w-72 right-0 top-6 z-30 mt-2 bg-white p-2 rounded inline-block shadow-lg"
                                >
                                    <div className='flex items-center justify-start'>
                                        <img
                                            src={user.imgUrl}
                                            alt="User Avatar"
                                            className="w-8 h-8 rounded-full mr-2 ms-2"
                                        />
                                        <p className="text-black">{user.email}</p>
                                    </div>
                                    <hr className="border-black border-t-1 mt-2" />
                                    <Link to={"/Favorite/Favorite"}>
                                        <div className='flex items-center justify-start p-2 mt-1 text-black  hover:bg-black hover:text-white'>
                                            <HiLibrary size={18} />
                                            <button className=" ms-2">Movie Library Management</button>
                                        </div>
                                    </Link>
                                    <Link to={"/Acount/Account"}>
                                        <div className='flex items-center justify-start p-2 mt-1 text-black hover:bg-black hover:text-white'>
                                            <FaUser size={18} />
                                            <button className="ms-2">Account</button>
                                        </div>
                                    </Link>
                                    <div onClick={logout} className='flex items-center justify-start p-2 mt-1 text-red-700   hover:bg-black hover:text-white'>
                                        <IoMdLogOut size={18} />
                                        <button className="ms-2">Logout</button>
                                    </div>
                                </div>

                            </div>

                        </div>
                    ) : (
                        <button
                            onClick={handleOpen}
                            className="px-2 py-1  hover:bg-blue-600 rounded-md text-white text-sm border border-white"
                        >
                            Đăng Nhập
                        </button>

                    )}
                </div>
            </div>
        </>


    );
}
