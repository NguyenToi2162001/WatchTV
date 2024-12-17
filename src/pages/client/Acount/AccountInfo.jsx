import React, { useContext, useEffect, useState } from 'react';
import {
    TextField,
    FormControl,
    Button,
    FormLabel, RadioGroup, FormControlLabel, Radio,
} from '@mui/material';
import { useAuth } from "../../../context/AuthsProvider";
import { addDocument, deleteDocument, updateDocument } from '../../../services/FirebaseService';
import { useNotification } from "../../../context/NotificationProvider";
import { useAccount } from '../../../context/AccountsProvider';

function AccountInfo() {
    const { login } = useAuth();
    const showNotification = useNotification();
    const { account , setAccount } = useAccount();

    const handleInput = (event) => {
        const { name, value } = event.target;
        setAccount((prevUsers) => ({ ...prevUsers, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent page reload

        try {
            if (account.id) {
                await updateDocument("Accounts", account);
                showNotification('User has been updated successfully!', "info");
                login(account);
            } else {
                showNotification('No user ID found, unable to update.', "error");
            }
        } catch (error) {
            console.error("Error:", error);
            showNotification('An error occurred while updating the user.', "error");
        }
    };
    return (
            <div className="flex-1">
                <div className="bg-white p-6">
                    <h2 className="text-2xl font-semibold mb-6">Account Information</h2>
                    <form className="grid gap-6" onSubmit={handleSubmit}>
                        <TextField
                            variant="outlined"
                            className="bg-gray-50 rounded-md"
                            name="fullName"
                            value={account?.fullName || ""}
                            InputProps={{
                                style: { borderRadius: "8px" },
                            }}
                            fullWidth
                            onChange={handleInput}
                        />
                        <div className="flex gap-4">
                            <TextField
                                name="username"
                                variant="outlined"
                                value={account?.username || ""}
                                className="bg-gray-50 rounded-md"
                                InputProps={{
                                    style: { borderRadius: "8px" },
                                }}
                                disabled
                                fullWidth
                            />
                            <TextField
                                name="email"
                                variant="outlined"
                                value={account?.email || ""}
                                className="bg-gray-50 rounded-md"
                                InputProps={{
                                    style: { borderRadius: "8px" },
                                }}
                                disabled
                                fullWidth
                            />
                        </div>
                        <FormControl>
                            <FormLabel className="text-gray-600 font-medium">Gender</FormLabel>
                            <RadioGroup
                                row
                                name="gender"
                                value={account?.gender || ""}
                                onChange={handleInput}

                            >
                                <FormControlLabel
                                    value="male"
                                    control={<Radio />}
                                    label="Male"
                                />
                                <FormControlLabel
                                    value="female"
                                    control={<Radio />}
                                    label="Female"
                                />
                                <FormControlLabel
                                    value="other"
                                    control={<Radio />}
                                    label="Other"
                                />
                            </RadioGroup>
                        </FormControl>
                        <TextField
                            label="Phone"
                            name="phone"
                            variant="outlined"
                            className="bg-gray-50 rounded-md"
                            value={account?.phone || ''}
                            InputProps={{
                                style: { borderRadius: "8px" },
                            }}
                            onChange={handleInput}
                            fullWidth
                        />
                        <TextField
                            name="password"
                            variant="outlined"
                            value={account?.password || ''}
                            className="bg-gray-50 rounded-md"
                            InputProps={{
                                style: { borderRadius: "8px" },
                            }}
                            onChange={handleInput}
                            fullWidth
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className="w-32 bg-blue-500 text-white hover:bg-blue-600 text-sm rounded-md"
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
    );
}

export default AccountInfo;