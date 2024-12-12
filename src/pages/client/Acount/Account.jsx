import React from 'react';
import { FaUserCircle, FaUser } from 'react-icons/fa';
import { ImLibrary } from 'react-icons/im';
import { CgMenuGridR } from 'react-icons/cg';
import { GiBoxUnpacking } from "react-icons/gi";
import { RiLogoutCircleRLine } from "react-icons/ri";

import { Outlet, Link } from 'react-router-dom';
import {
    Button,
    Box,
    Typography, Grid, Divider
} from '@mui/material';
function Account(props) {
    return (
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
                    <FaUserCircle size={60} color="#007bff" />
                    <Button variant="outlined" sx={{ mt: 1 }}>
                        Choose Avatar
                    </Button>
                    <Typography variant="body2" sx={{ mt: 1, color: '#555' }}>
                        nguyentamtoi216@gmail.com
                    </Typography>
                </Box>

                <Divider sx={{ mb: 2 }} />

                {/* Navigation Links */}
                <Box>
                    <Box className="flex p-4 hover:bg-black hover:text-white">
                        <FaUser size={20} />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                            <Link to="info" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Account
                            </Link>
                        </Typography>
                    </Box>
                    <Box className="flex p-4 hover:bg-black hover:text-white">
                        <ImLibrary size={20} />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                            <Link to="library" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Movie Library Management
                            </Link>
                        </Typography>
                    </Box>
                    <Box className="flex p-4 hover:bg-black hover:text-white">
                        <CgMenuGridR size={20} />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                            <Link to="subscription" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Subscription Plan Management
                            </Link>
                        </Typography>
                    </Box>
                    <Box className="flex p-4 hover:bg-black hover:text-white">
                        <GiBoxUnpacking
                            size={20} />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                            <Link to="offer" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Your Offer
                            </Link>
                        </Typography>
                    </Box>
                    <Box className="flex p-4 hover:bg-black hover:text-white">
                        <RiLogoutCircleRLine
                            size={20} />
                        <Typography variant="body1" sx={{ ml: 2 }}>
                            <Link to="" style={{ textDecoration: 'none', color: 'inherit' }}>
                                Log Out
                            </Link>
                        </Typography>
                    </Box>
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
                <Outlet />
            </Box>
        </Box>
    );
}

export default Account;