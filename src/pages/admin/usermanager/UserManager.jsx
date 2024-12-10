import React from 'react';
import { useContext, useState } from 'react';
import { IoMdPhotos } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, InputAdornment, FormControl, Select, InputLabel, MenuItem, FormHelperText,
    TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination, Avatar
} from '@mui/material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/FirebaseService';
import { useNotification } from "../../../context/NotificationProvider";
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CiSearch } from "react-icons/ci";
import { ContextSignUps } from '../../../context/SignUpProvider'
import ModalDelete from '../../../components/ModalDelete';
import { getObjectById } from '../../../services/ResponsitoryService';
import { ROLES } from '../../../utils/Constants';
const inner = {
    username: '',
    email: '',
    password: '',
    role: '',
    img: ''
}
function UserManager(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState(inner);
    const [openDelete, setOpenDelete] = useState(false);
    const [idxoa, setIdxoa] = useState(null);
    const [open, setOpen] = useState(false);
    const accounts = useContext(ContextSignUps)
    const showNotification = useNotification();
    const [account, setAccount] = useState(inner);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [showPassword, setShowPassword] = useState(false);

    const handleOpen = () => {
        setOpen(true);
        setErrors(inner);
        setShowPassword(false)
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setAccount({ ...account, [name]: value });
    };

    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Validation cho từng field
        if (!account.username.trim()) {
            tempErrors.username = 'Username không được để trống.';
            isValid = false;
        }

        if (!account.email.trim()) {
            tempErrors.email = 'Email không được để trống.';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email)) {
            tempErrors.email = 'Email không hợp lệ.';
            isValid = false;
        }

        if (!account.password) {
            tempErrors.password = 'Password không được để trống.';
            isValid = false;
        } else if (account.password.length < 6) {
            tempErrors.password = 'Password phải ít nhất 6 ký tự.';
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = async () => {
        if (!validate()) return;
        if (account.id) {
            await updateDocument('Accounts', account);
            showNotification('Account updated successfully!', "info");
        } else {
            await addDocument("Accounts", account);
            showNotification('Account add successfully!', "success");
        };
        handleClose();
    }
    const deleteItem = async () => {
        await deleteDocument('Accounts', idxoa);
        showNotification('Account deleted successfully!', "error");
        setOpenDelete(false);
    }

    const filtered = accounts?.filter((item) =>
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Tính toán hàng cần hiển thị cho trang hiện tại
    const rowsToShow = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    // Hàm thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Hàm thay đổi số hàng mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Quay lại trang đầu khi thay đổi số hàng
    };

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

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
    return (
        <div>
            <div className='flex items-center'>
                <h1 className='justify-start'>List Episodes</h1>
                <div className='flex-1 text-center'>
                    <TextField
                        variant="outlined"
                        placeholder="Enter keywords..."
                        size="small"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CiSearch style={{ color: '#999' }} />
                                </InputAdornment>
                            ),
                        }}

                    />
                </div>
            </div>
            <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>User Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Password</TableCell>
                            <TableCell>Role</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToShow.map((row, index) => (
                            <TableRow key={index + 1}>
                                <TableCell component="th" scope="row">
                                    {page * rowsPerPage + index + 1} {/* Đánh số thứ tự trên từng trang */}
                                </TableCell>
                                <TableCell>
                                    <img src={row.imgUrl} alt="" className='w-10 h-10 rounded-md' />
                                </TableCell>
                                <TableCell>{row.username}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.password}</TableCell>
                                <TableCell>{row.role}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => { handleOpen(); setAccount(row); }} color="primary">
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton color="secondary" onClick={() => { setOpenDelete(true); setIdxoa(row.id); }}>
                                        <RiDeleteBin5Fill />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={account.length} // Tổng số hàng
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]} // Tùy chọn số hàng mỗi trang
                />
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> EDIT USER </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Username"
                        type="text"
                        fullWidth
                        multiline
                        value={account.username}
                        name='username'
                        InputProps={{
                            readOnly: true, // Đặt chỉ đọc
                        }}

                    />
                    <TextField
                        margin="dense"
                        label="Email"
                        type="email"
                        fullWidth
                        multiline
                        value={account.email}
                        name="email"
                        InputProps={{
                            readOnly: true, // Đặt chỉ đọc
                        }}
                    />
                    <TextField
                        margin="dense"
                        label="Password"
                        type={showPassword ? "text" : "password"} // Dễ dàng chuyển đổi giữa kiểu text và password
                        fullWidth
                        value={account.password}
                        name="password"
                        onChange={handleInput}
                        error={!!errors.password}
                        helperText={errors.password}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={togglePasswordVisibility} edge="end">
                                        {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                    />
                    <FormControl
                        fullWidth
                        margin="dense"
                        error={!!errors.role}>
                        <InputLabel id="role-label">Role</InputLabel>
                        <Select
                            labelId="role-label"
                            value={account.role}
                            onChange={handleInput}
                            name="role"
                        >
                            {Object.values(ROLES).map((role, index) => (
                                <MenuItem key={index} value={role}>
                                    {role}
                                </MenuItem>
                            ))}


                        </Select>
                        <FormHelperText>{errors.role}</FormHelperText>
                    </FormControl>
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
                    <Avatar
                        src={account?.imgUrl || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZukuWgRHQCiGGw2RWbHSVID_whS03Ukg0rQ&s"}
                        alt="Actor Image"
                        sx={{ width: 150, height: 150, margin: '10px auto' }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">Yes</Button>
                </DialogActions>
            </Dialog>
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} deleteItem={deleteItem} />
        </div>
    );
}

export default UserManager;