
import { useNotification } from "../../../context/NotificationProvider";
import { addDocument } from '../../../services/FirebaseService';
import { LuUser2 } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa6";
import {
    Dialog, DialogTitle, DialogContent,
    TextField, Button, InputAdornment
} from '@mui/material';
import React, { useState, useContext } from 'react';
import { useAuth } from "../../../context/AuthsProvider";
const inner = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: ""
};

function DialogSignUp({ openSignUp, handleOpen, handleCloseSignUp,
}) {
    const showNotification = useNotification();
    const [errors, setErrors] = useState(inner);
    const [account, setAccount] = useState(inner);
    const { login } = useAuth();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setAccount({ ...account, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;
        // Kiểm tra username
        if (!account.username) {
            newErrors.username = "Username is required.";
            isValid = false;
        }
        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!account.email) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!emailRegex.test(account.email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }
        // Kiểm tra password
        if (!account.password) {
            newErrors.password = "Password is required.";
            isValid = false;
        }
        // Kiểm tra confirm password
        if (account.password !== account.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match.";
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {

                // Gọi hàm addDocument và đợi cho đến khi hoàn tất
                const result = await addDocument("Accounts", account);
                login(result);
                // Hiển thị thông báo thành công
                showNotification('Sign Up Successfully!', "success");
                handleCloseSignUp()
            } catch (error) {
                // Xử lý lỗi nếu có
                console.error('Error adding account:', error);
                showNotification('Failed to add account. Please try again.', "error");
            }
        }
    };
    return (
        <div>
            <Dialog open={openSignUp} onClose={handleCloseSignUp} sx={{
                "& .MuiPaper-root": {
                    borderRadius: "20px",
                    padding: " 10px"    // Làm tròn góc
                },
            }}>
                <DialogTitle className='flex justify-center '><p className='font-bold text-2xl'>Sign Up</p></DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        variant="outlined"
                        placeholder="Enter your username"
                        onChange={handleInput}
                        name='username'
                        error={!!errors.username}
                        helperText={errors.username}
                        sx={{
                            marginBottom: "16px",
                            "& .MuiOutlinedInput-root": { borderRadius: "30px" },
                            "& fieldset": { borderRadius: "30px" },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LuUser2 style={{ color: 'gray' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="email"
                        type="text"
                        fullWidth
                        variant="outlined"
                        placeholder="e.g.Example@gmail.com"
                        onChange={handleInput}
                        name='email'
                        error={!!errors.email}
                        helperText={errors.email}
                        sx={{
                            marginBottom: "16px",
                            "& .MuiOutlinedInput-root": { borderRadius: "30px" },
                            "& fieldset": { borderRadius: "30px" },
                        }}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <LuUser2 style={{ color: 'gray' }} />
                                </InputAdornment>
                            ),
                        }}
                    />

                    <TextField
                        margin="dense"
                        label="password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        placeholder="e.g. Example2001"
                        onChange={handleInput}
                        name='password'
                        error={!!errors.password}
                        helperText={errors.password}
                        sx={{
                            marginBottom: "16px",
                            "& .MuiOutlinedInput-root": { borderRadius: "30px" },
                            "& fieldset": { borderRadius: "30px" },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FaRegEyeSlash style={{ color: 'gray' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Confirm Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        placeholder="e.g. Example2001"
                        onChange={handleInput}
                        name='confirmPassword'
                        error={!!errors.confirmPassword}
                        helperText={errors.confirmPassword}
                        sx={{
                            marginBottom: "16px",
                            "& .MuiOutlinedInput-root": { borderRadius: "30px" },
                            "& fieldset": { borderRadius: "30px" },
                        }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <FaRegEyeSlash style={{ color: 'gray' }} />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <div onClick={handleSubmit} className='flex  justify-center mt-2'>
                        <Button
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: '20px'
                            }}

                        >
                            Sign Up
                        </Button>
                    </div>
                    <div className='flex justify-center items-center mt-2'>
                        <p className='font-medium'>Alreaday have an account?</p>
                        <p className='ms-2 text-blue-500' onClick={handleOpen}>Login</p>
                    </div>
                    <div class="flex items-center my-4">
                        <hr class="flex-grow border-t border-gray-300" />
                        <span class="mx-4">OR</span>
                        <hr class="flex-grow border-t border-gray-300" />
                    </div>
                    <div className='flex items-center justify-center'>
                        <button class="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white py-2 px-6 rounded-md">
                            G Continue with Google
                        </button>
                    </div>
                    <div className='flex items-center justify-center mt-2 '>
                        <p className='text-slate-400'>By singing up , you agree to our <label className='text-blue-500'>Terms of Service </label> and <label className='text-blue-500'>Privacy Policy</label></p>
                    </div>
                    <div className='flex items-center justify-center mt-2 '>
                        <p className='text-slate-400'>Need help? Contact <label className='text-blue-500'>Support</label></p>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default DialogSignUp;