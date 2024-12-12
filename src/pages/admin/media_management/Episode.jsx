import React from 'react';
import { useContext, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, InputAdornment, FormControl, Select, InputLabel, MenuItem,FormHelperText,
    TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, TablePagination
} from '@mui/material';
import { addDocument, deleteDocument, updateDocument } from '../../../services/FirebaseService';
import { useNotification } from "../../../context/NotificationProvider";
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { CiSearch } from "react-icons/ci";
import { ContextMovies } from '../../../context/MoviesProvider';
import { ContextEpisodes } from '../../../context/EpisodesProvider'
import ModalDelete from '../../../components/ModalDelete';
import { getObjectById } from '../../../services/ResponsitoryService';
const inner = {
    episodesNumber: '',
    episodeURL: '',
    idMovie: ''
}
function Episode(props) {
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState(inner);
    const [openDelete, setOpenDelete] = useState(false);
    const [idxoa, setIdxoa] = useState(null);
    const [open, setOpen] = useState(false);
    const movies = useContext(ContextMovies)
    const showNotification = useNotification();
    const [episode, setEpisode] = useState(inner);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const episodes = useContext(ContextEpisodes);
    const handleOpen = () => {
        setOpen(true);
    };
    const resetModal = () => {
        setEpisode(inner);
        setErrors(inner)
        handleOpen();
    }
    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setEpisode({ ...episode, [name]: value });
    };

    const validation = () => {
        const newError = {
            ...inner, // Khởi tạo trạng thái lỗi dựa trên cấu trúc mẫu
        };
        // Kiểm tra từng trường với điều kiện cụ thể
        newError.episodesNumber = episode.episodesNumber?.trim()
            ? ""
            : "Vui lòng nhập tap phim (episodesNumber).";
        newError.episodeURL = episode.episodeURL?.trim()
            ? ""
            : "Vui lòng nhập link phim (episodeURL).";
        newError.idMovie = episode.idMovie
            ? ""
            : "Vui lòng chọn Movie (idMovie).";
        // Cập nhật trạng thái lỗi
        setErrors(newError);

        // Debug lỗi (nếu cần)
        console.log("Validation Errors:", newError);

        // Trả về `true` nếu tất cả trường đều hợp lệ
        return Object.values(newError).every((error) => error === "");
    };

    const handleSubmit = async () => {
        if (!validation()) return;
        if (episode.id) {
            await updateDocument('Episodes', episode);
            showNotification('Episode updated successfully!', "info");
        } else {
            await addDocument("Episodes", episode);
            showNotification('Episode add successfully!', "success");
        };
        handleClose();
    }
    const deleteItem = async () => {
        await deleteDocument('Episodes', idxoa);
        showNotification('Episode deleted successfully!', "error");
        setOpenDelete(false);
    }

    const filtered = episodes?.filter((item) => item.episodeURL.toLowerCase().includes(searchTerm.toLowerCase()));
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
                <h1 className='font-bold'>List Episodes</h1>
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
                <Button onClick={resetModal} variant="contained">ADD EPISODES</Button>
            </div>
            <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>#</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Episodes Number</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Episode URL</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Name Movie</TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToShow.map((row, index) => (
                            <TableRow key={index + 1}>
                                <TableCell component="th" scope="row">
                                    {page * rowsPerPage + index + 1} {/* Đánh số thứ tự trên từng trang */}
                                </TableCell>
                                <TableCell>{row.episodesNumber}</TableCell>
                                <TableCell>{row.episodeURL}</TableCell>
                                <TableCell>{getObjectById(row.idMovie, movies)?.name}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => { handleOpen(); setEpisode(row); }} color="primary">
                                        <MdEdit className='bg-blue-700 text-white p-1 border rounded-lg' />
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
                    count={episode.length} // Tổng số hàng
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
                    <TextField
                        autoFocus
                        margin="dense"
                        label="episodesNumber"
                        type="number"
                        fullWidth
                        value={episode.episodesNumber}
                        name='episodesNumber'
                        onChange={handleInput}
                        error={!!errors.episodesNumber}
                        helperText={errors.episodesNumber}

                    />
                    <TextField
                        margin="dense"
                        label="episodeURL"
                        type="text"
                        fullWidth
                        multiline
                        value={episode.episodeURL}
                        name='episodeURL'
                        onChange={handleInput}
                        error={!!errors.episodeURL}
                        helperText={errors.episodeURL}


                    />
                    <FormControl sx={{ mt: 1 }} fullWidth>
                        <InputLabel id="my-select-label">Movie</InputLabel>
                        <Select
                            labelId="my-select-label"
                            label="Chọn giá trị"
                            name='idMovie'
                            value={episode.idMovie}
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

export default Episode;