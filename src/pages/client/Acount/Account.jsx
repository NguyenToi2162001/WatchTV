import React, { useState, useEffect, useContext } from 'react';
import { FaUserCircle, FaUser } from 'react-icons/fa';
import { ImLibrary } from 'react-icons/im';
import { CgMenuGridR } from 'react-icons/cg';
import { GiBoxUnpacking } from "react-icons/gi";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useAuth } from "../../../context/AuthsProvider";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { IoMdPhotos } from "react-icons/io";
import {
    Button,
    Box,
    Typography, Grid, Divider, Avatar, IconButton
} from '@mui/material';
import { Password } from '@mui/icons-material';
import { AccountsProvider } from '../../../context/AccountsProvider';

function Account(props) {
    const { user } = useAuth();
    const [account, setAccount] = useState({
        id: "",
        fullName: "",
        username: "",
        email: "",
        gender: "",
        phone: "",
        password: ""
    });
    useEffect(() => {
        if (user) {
            setAccount(user);
        }
    }, [user]);


    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAccount({ ...account, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <AccountsProvider value={{account , setAccount}}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    minHeight: '100vh',
                    bgcolor: '#f4f4f4',
                    p: 2,
                }}
            >
                {/* Sidebar */}
                <Box
                    sx={{
                        width: { xs: '100%', md: '25%' },
                        p: 2,
                        bgcolor: '#fff',
                        boxShadow: 3,
                        borderRadius: 2,
                        mb: { xs: 3, md: 0 },
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            mb: 4,
                        }}
                    >
                        <Avatar
                            src={account?.imgUrl}
                            alt="Acactor Image"
                            sx={{ width: 150, height: 150, margin: '10px auto' }}
                        />

                        <label htmlFor="upload-photo">
                            <input
                                style={{ display: 'none' }}
                                id="upload-photo"
                                name="upload-photo"
                                type="file"
                                onChange={handleImageChange}


                            />
                            <IconButton color="primary" component="span">
                                <IoMdPhotos />
                            </IconButton>
                        </label>

                    </Box>


                    <Divider sx={{ mb: 2 }} />

                    {/* Navigation Links */}
                    <Box>
                        <Link to="info">
                            <Box className="flex p-4 hover:bg-black hover:text-white">
                                <FaUser size={20} />
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    <p style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Account
                                    </p>
                                </Typography>
                            </Box></Link>
                        <Link to="library" >
                            <Box className="flex p-4 hover:bg-black hover:text-white">
                                <ImLibrary size={20} />
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    <p style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Movie Library Management
                                    </p>
                                </Typography>
                            </Box></Link>
                        <Link to="subscription">
                            <Box className="flex p-4 hover:bg-black hover:text-white">
                                <CgMenuGridR size={20} />
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    <p style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Subscription Plan Management
                                    </p>
                                </Typography>
                            </Box>
                        </Link>
                        <Link to="offer">
                            <Box className="flex p-4 hover:bg-black hover:text-white">
                                <GiBoxUnpacking
                                    size={20} />
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    <p style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Your Offer
                                    </p>
                                </Typography>
                            </Box></Link>
                        <Link to="">
                            <Box className="flex p-4 hover:bg-black hover:text-white">
                                <RiLogoutCircleRLine
                                    size={20} />
                                <Typography variant="body1" sx={{ ml: 2 }}>
                                    <p style={{ textDecoration: 'none', color: 'inherit' }}>
                                        Log Out
                                    </p>
                                </Typography>
                            </Box></Link>
                    </Box>
                </Box>

                {/* Main Content */}
                <Box
                    sx={{
                        flex: 1,
                        p: 2,
                        bgcolor: '#fff',
                        boxShadow: 3,
                        borderRadius: 2,
                    }}
                >
                    <Outlet  account={account}  setAccount={setAccount}/>
                </Box>
            </Box>
        </AccountsProvider>
    );
}

export default Account;