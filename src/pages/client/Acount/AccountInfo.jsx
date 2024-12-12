import React from 'react';
import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button,
    Box,
    Typography, Grid, Divider
} from '@mui/material';
function AccountInfo(props) {
    return (
        <div>
            <Box
                sx={{
                    flex: 1,
                    p: 2,
                    bgcolor: '#fff',
                    boxShadow: 3,
                    borderRadius: 2,
                }}
            >
                <Box
                    component="form"
                    sx={{
                        p: 3,
                        bgcolor: '#fff',
                        boxShadow: 3,
                        borderRadius: 2,
                        maxWidth: { xs: '100%', sm: '600px' }, // Full width on mobile, fixed width on larger screens
                        mx: 'auto',
                    }}
                >
                    <Typography variant="h5" align="center" gutterBottom>
                        Account Information
                    </Typography>

                    <Grid container spacing={2}>
                        {/* Full Name */}
                        <Grid item xs={12}>
                            <TextField
                                label="Full Name"
                                name="fullname"
                                fullWidth
                                required
                            />
                        </Grid>

                        {/* Username */}
                        <Grid item xs={12}>
                            <TextField
                                label="Username"
                                name="username"
                                fullWidth
                                required
                            />
                        </Grid>

                        {/* Email */}
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                type="email"
                                name="email"
                                fullWidth
                                required
                            />
                        </Grid>

                        {/* Gender */}
                        <Grid item xs={12}>
                            <FormControl fullWidth required>
                                <InputLabel>Gender</InputLabel>
                                <Select name="gender">
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value="male">Male</MenuItem>
                                    <MenuItem value="female">Female</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        {/* Phone */}
                        <Grid item xs={12}>
                            <TextField
                                label="Phone"
                                type="tel"
                                name="phone"
                                fullWidth
                                required
                            />
                        </Grid>

                        {/* Password */}
                        <Grid item xs={12}>
                            <TextField
                                label="Password"
                                type="password"
                                name="password"
                                fullWidth
                                required
                            />
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </div>
    );
}

export default AccountInfo;