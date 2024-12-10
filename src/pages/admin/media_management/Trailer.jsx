import React from 'react';
import { useContext, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, InputAdornment, FormControl, Select, InputLabel, MenuItem, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination,
    FormHelperText
} from '@mui/material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/FirebaseService';
import { useNotification } from "../../../context/NotificationProvider";

import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CiSearch } from "react-icons/ci";
import { ContextMovies } from '../../../context/MoviesProvider';
import { ContextTrailers } from '../../../context/TrailersProvider'
import ModalDelete from '../../../components/ModalDelete';
import { getObjectById } from '../../../services/ResponsitoryService';
const inner = {
    idMovie: '',
    trailerURL: '',
}
function Trailer(props) {
    const [errors, setErrors] = useState(inner);
    const [searchTerm, setSearchTerm] = useState('');
    const [openDelete, setOpenDelete] = useState(false);
    const [idxoa, setIdxoa] = useState(null);
    const [open, setOpen] = useState(false);
    const movies = useContext(ContextMovies)
    const showNotification = useNotification();
    const [trailer, setTrailer] = useState(inner);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const trailers = useContext(ContextTrailers);
    const handleOpen = () => {
        setOpen(true);
    };
    const resetModal = () => {
        setTrailer(inner);
        setErrors(inner);
        handleOpen();
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setTrailer({ ...trailer, [name]: value });
    };

    const validation = () => {
        const newError = {
            ...inner, // Khởi tạo trạng thái lỗi dựa trên cấu trúc mẫu
        };
        // Kiểm tra từng trường với điều kiện cụ thể
        newError.idMovie = trailer.idMovie
            ? ""
            : "Vui lòng chọn Movie (idMovie).";
        newError.trailerURL = trailer.trailerURL?.trim()
            ? ""
            : "Vui lòng nhập link trailer (episodeURL).";
        // Cập nhật trạng thái lỗi
        setErrors(newError);

        // Debug lỗi (nếu cần)
        console.log("Validation Errors:", newError);

        // Trả về `true` nếu tất cả trường đều hợp lệ
        return Object.values(newError).every((error) => error === "");
    };

    const handleSubmit = async () => {
        if (!validation()) return;
        if (trailer.id) {
            await updateDocument('Trailers', trailer);
            showNotification('Trailer updated successfully!', "info");
        } else {
            await addDocument("Trailers", trailer);
            showNotification('Trailer add successfully!', "success");
        };
        handleClose();
    }
    const deleteItem = async () => {
        await deleteDocument('Trailers', idxoa);
        showNotification('Trailer deleted successfully!', "error");
        setOpenDelete(false);
    }

    const filtered = trailers?.filter((item) => item.trailerURL.toLowerCase().includes(searchTerm.toLowerCase()));
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
    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1>List Trailers</h1>
                <div className='flex items-center'>
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
                <Button onClick={resetModal} variant="contained">ADD TRAILER</Button>
            </div>
            <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name Movie</TableCell>
                            <TableCell>Trailer URL</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToShow.map((row, index) => (
                            <TableRow key={index + 1}>
                                <TableCell component="th" scope="row">
                                    {page * rowsPerPage + index + 1} {/* Đánh số thứ tự trên từng trang */}
                                </TableCell>
                                <TableCell>{getObjectById(row.idMovie, movies)?.name}</TableCell>
                                <TableCell>{row.trailerURL}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => { handleOpen(); setTrailer(row); }} color="primary">
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
                    count={trailer.length} // Tổng số hàng
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]} // Tùy chọn số hàng mỗi trang
                />
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> ADD EPISODES </DialogTitle>
                <DialogContent>
                    <FormControl sx={{ mt: 1 }} fullWidth>
                        <InputLabel id="my-select-label">Movie</InputLabel>
                        <Select
                            labelId="my-select-label"
                            label="Chọn giá trị"
                            name='idMovie'
                            value={trailer.idMovie}
                            onChange={handleInput}
                            error={!!errors.idMovie}
                        >
                            {movies
                                ?.slice() // Tạo bản sao để tránh thay đổi mảng gốc
                                .sort((a, b) => a.lever - b.lever) // Sắp xếp tăng dần theo lever
                                .map((row, index) => (
                                    <MenuItem key={index} value={row.id}>
                                        {row.name}
                                    </MenuItem>
                                ))}
                        </Select>
                        <FormHelperText>{errors.idMovie}</FormHelperText>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="trailerURL"
                        type="text"
                        fullWidth
                        multiline
                        value={trailer.trailerURL}
                        name='trailerURL'
                        onChange={handleInput}
                        error={!!errors.trailerURL}
                        helperText={errors.trailerURL}

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

export default Trailer;