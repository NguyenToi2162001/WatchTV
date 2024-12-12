import { useContext, useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import { ContextCategories } from '../../../context/CategoriesProvider';
import React from 'react';
import Modal from '@mui/material/Modal';
import { addDocument, deleteDocument, updateDocument } from '../../../services/FirebaseService';
import { useNotification } from "../../../context/NotificationProvider";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper, TextField, Button, Box, Typography, Container, InputAdornment, IconButton,
    Snackbar, Alert, TablePagination
} from '@mui/material';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import ModalDelete from '../../../components/ModalDelete';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '1px solid #000',
    boxShadow: 24,
    p: 2,

};
const intern = {
    nameCategory: '',
    description: '',
}

function Categories(props) {
    const [idxoa, setIdxoa] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Số hàng mỗi trang
    const categories = useContext(ContextCategories);
    const [open, setOpen] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [errors, setErrors] = useState(intern);
    const [newCategory, setnewCategory] = useState(intern);
    const showNotification = useNotification();
    const [searchTerm, setSearchTerm] = useState('');

    // Hàm xử lý tìm kiếm
    const filtered = categories?.filter((item) => item.nameCategory.toLowerCase().includes(searchTerm.toLowerCase()));
    // Tính toán hàng cần hiển thị cho trang hiện tại
    const rowsToShow = filtered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleOpen = () => {
        setErrors(intern);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setnewCategory({ ...newCategory, [name]: value });

    };

    const validation = () => {
        const newError = { ...errors };
        newError.nameCategory = newCategory.nameCategory ? "" : "vui long nhap name";
        newError.description = newCategory.description ? "" : "vui long nhap discription";
        setErrors(newError);
        return Object.values(newError).every((error) => error === '');
    }

    const resetModal = () => {
        setnewCategory(intern);
        setErrors(intern);
        handleOpen();
    }

    const handleSubmit = async () => {
        if (!validation()) return;
        if (newCategory.id) {
            await updateDocument('Categories', newCategory); 
            showNotification('Category updated successfully!', "info");      
        }
        else {
            await addDocument('Categories', newCategory);
            showNotification('Category added successfully!', "success");  
        }
       
        handleClose();
    };

    const deleteItem = async () => {
        await deleteDocument('Categories',idxoa);
        showNotification('Category deleted successfully!', "error");  
        setOpenDelete(false);
    }

    // Hàm thay đổi trang
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    // Hàm thay đổi số hàng mỗi trang
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); // Quay lại trang đầu khi thay đổi số hàng
    };



    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1 className='font-bold'>List Categories</h1>
                <div className='flex items-center'>
                    <TextField
                        variant="outlined"
                        placeholder="Enter keywords..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <CiSearch style={{ color: '#999' }} />
                                </InputAdornment>
                            ),
                        }}
                        style={{
                            backgroundColor: '#fff',
                            borderRadius: '4px 0 0 4px',
                            width: '100%',
                            maxWidth: '400px',
                        }}
                    />
                    <Button
                        variant="contained"
                        style={{
                            backgroundColor: '#4186E0',
                            color: '#fff',
                            minWidth: '50px',
                            borderRadius: '0 4px 4px 0',
                            height: '56px',
                        }}
                    >
                        <CiSearch />
                    </Button>
                </div>
                    <Button  style={{
                            backgroundColor: '#4186E0',
                            color: '#fff',
                            minWidth: '50px',
                            borderRadius: '0 4px 4px 0',
                            height: '56px',
                        }} onClick={resetModal} variant="contained">ADD CATEGORY</Button>
                    <Modal
                        open={open}
                        onClose={handleClose}
                    >
                        <Box sx={{ ...style }}>
                            <Container maxWidth="sm">
                                <Box spacing={2} display="flex" flexDirection="column">
                                    <Typography className='text-center' variant="h4" component="h3" gutterBottom>
                                        {newCategory.id ? "Edit Category" : "Add Category"}
                                    </Typography>
                                    <div >
                                        <TextField
                                            label="Name"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            name='nameCategory'
                                            value={newCategory.nameCategory}
                                            onChange={handleInput}
                                            error={!!errors.nameCategory}
                                            helperText={errors.nameCategory}

                                        />

                                        <TextField
                                            label="Description"
                                            variant="outlined"
                                            fullWidth
                                            margin="normal"
                                            name='description'
                                            value={newCategory.description}
                                            onChange={handleInput}
                                            error={!!errors.description}
                                            helperText={errors.description}
                                            className='mb-3'
                                        />
                                        <Button style={{ marginTop: "16px" }} onClick={handleSubmit} fullWidth type="submit" variant="contained" color="primary" >
                                            {newCategory.id ? "Edit " : "Add "}
                                        </Button>
                                    </div>
                                </Box>
                            </Container>
                        </Box>
                    </Modal>  
            </div>
            <div>
                <TableContainer className='mt-7' component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell  sx={{ fontWeight: 'bold' }}>#</TableCell>
                                <TableCell  sx={{ fontWeight: 'bold' }}>Name Category</TableCell>
                                <TableCell  sx={{ fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell  sx={{ fontWeight: 'bold' }}>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rowsToShow.map((row, index) => (
                                <TableRow key={index + 1}>
                                    <TableCell component="th" scope="row">
                                        {page * rowsPerPage + index + 1} {/* Đánh số thứ tự trên từng trang */}
                                    </TableCell>
                                    <TableCell>{row.nameCategory}</TableCell>
                                    <TableCell>{row.description}</TableCell>
                                    <TableCell>
                                        <IconButton onClick={() => { handleOpen(); setnewCategory(row); }} color="primary">
                                            <MdEdit  className='bg-blue-700 text-white p-1 border rounded-lg' />
                                        </IconButton>
                                        <IconButton color="secondary" onClick={() => { setOpenDelete(true); setIdxoa(row.id); }}>
                                            <RiDeleteBin5Fill className='bg-red-700 text-white p-1 border rounded-lg' />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        component="div"
                        count={categories.length} // Tổng số hàng
                        page={page}
                        onPageChange={handleChangePage}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[5, 10, 25]} // Tùy chọn số hàng mỗi trang
                    />
                </TableContainer>
            </div>
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} deleteItem={deleteItem} />

        </div>

    );
}

export default Categories;