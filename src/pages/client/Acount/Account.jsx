import React, { useState, useEffect, useContext } from 'react';
import { useAuth } from "../../../context/AuthsProvider";
import { Outlet, Link, useLocation } from 'react-router-dom';
import { IoMdPhotos } from "react-icons/io";
import { menuItems } from "../../../utils/Constants";
import {
    Button,
    Box,
    Typography, Grid, Divider, Avatar, IconButton
} from '@mui/material';
import { Password } from '@mui/icons-material';
import { AccountsProvider } from '../../../context/AccountsProvider';

function Account(props) {
    const { user } = useAuth();
    const location = useLocation();
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
        <AccountsProvider value={{ account, setAccount }}>
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
                        {menuItems.map((item, index) => {
                    
                            return (
                                <Link key={index} to={item.to}>
                                    <Box
                                        className={`flex p-4 hover:bg-black hover:text-white`}
                                    >
                                        {item.icon}
                                        <Typography variant="body1" sx={{ ml: 2 }}>
                                            <p style={{ textDecoration: "none", color: "inherit" }}>
                                                {item.label}
                                            </p>
                                        </Typography>
                                    </Box>
                                </Link>
                            );
                        })}
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
                    <Outlet account={account} setAccount={setAccount} />
                </Box>
            </Box>
        </AccountsProvider>
    );
}

export default Account;