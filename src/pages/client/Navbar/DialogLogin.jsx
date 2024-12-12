import React, { useState, useContext } from 'react';
import { LuUser2 } from "react-icons/lu";
import { FaRegEyeSlash } from "react-icons/fa6";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "../../../config/firebase";
import {ROLES} from '../../../utils/Constants';
import {addDocument} from '../../../services/FirebaseService'

import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Typography, InputAdornment
} from '@mui/material';
import { useAuth } from "../../../context/AuthsProvider";
import { ContextSignUps } from "../../../context/SignUpProvider";
const inner = {
    email: "",
    password: "",
}
function DialogLogin({ open, setOpen, handleOpenSignUp }) {

    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState(inner);
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const accounts = useContext(ContextSignUps)
    const handleClose = () => {
        setOpen(false)
    };

    const validateForm = () => {
        const newErrors = {};
        let isValid = true;

        // Kiểm tra email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            newErrors.email = "Email is required.";
            isValid = false;
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address.";
            isValid = false;
        }

        // Kiểm tra password
        if (!password) {
            newErrors.password = "Password is required.";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };


    const handleLogin = () => {
        // Tìm tài khoản trùng khớp email và password
        if (validateForm()) {
            const matchedAccount = accounts.find(
                (acc) => acc.email === email && acc.password === password
            );
            if (matchedAccount) {
                // Nếu đăng nhập thành công, lưu thông tin tài khoản vào AuthContext
                login(matchedAccount);

                handleClose()
            } else {
                alert("Invalid email or password");
            }
        }

    };

    // Google sign-in
    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            const user = result.user;
            const existingCustomer = accounts.find(customer => customer.email === user.email);
            let loggedInCustomer;

            if (!existingCustomer) {
                const newCustomer = {
                    username: user.displayName,
                    imgUrl: user.photoURL,
                    role: ROLES.USER,
                    email : user.email
                };
           const newAccount =  await addDocument('Accounts', newCustomer);
                loggedInCustomer = newAccount;
            } else {
                loggedInCustomer = existingCustomer;
            }
           login(loggedInCustomer);
           handleClose()
                 
        } catch (error) {
           
        }
    };

    return (
        <div>
            <Dialog sx={{
                "& .MuiPaper-root": {
                    borderRadius: "20px",
                    padding: " 10px"    // Làm tròn góc
                },
            }} open={open} onClose={handleClose}>
                <DialogTitle className='flex justify-center '><p className='font-bold text-2xl'>Login</p></DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Email or Username"
                        type="text"
                        fullWidth
                        variant="outlined"
                        placeholder="e.g.Example@gmail.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        label="Password"
                        type="password"
                        fullWidth
                        variant="outlined"
                        placeholder="e.g. Example2001"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        error={!!errors.password}
                        helperText={errors.username}
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

                    <div className='flex items-center  justify-center mt-2'>
                        <p className='text-slate-400'>Forgot password?</p>
                        <Button
                            onClick={handleLogin}
                            variant="contained"
                            color="primary"
                            sx={{
                                borderRadius: '20px',
                                marginLeft: "10px "
                            }}
                        >
                            Login
                        </Button>
                    </div>
                    <div className='flex justify-center items-center mt-2'>
                        <p className='font-medium'>Don't have an account?</p>
                        <p className='ms-2 text-blue-500' onClick={handleOpenSignUp}>Sign up</p>
                    </div>
                    <div class="flex items-center my-4">
                        <hr class="flex-grow border-t border-gray-300" />
                        <span class="mx-4">OR</span>
                        <hr class="flex-grow border-t border-gray-300" />
                    </div>
                    <div className='flex items-center justify-center'>
                        <button onClick={signInWithGoogle} class="bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 text-white py-2 px-6 rounded-md">
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

export default DialogLogin;