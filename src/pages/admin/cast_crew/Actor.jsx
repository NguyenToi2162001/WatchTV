import { useContext, useEffect, useState } from 'react';
import { addDocument, deleteDocument, updateDocument } from '../../../services/FirebaseService';
import { ContextActors } from '../../../context/ActorsProvider';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, Typography, Avatar, InputAdornment
} from '@mui/material';
import { CiSearch } from "react-icons/ci";
import {
    TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
    Snackbar, Alert, TablePagination
} from '@mui/material';
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import { IoMdPhotos } from "react-icons/io";
import ModalDelete from '../../../components/ModalDelete';
import { useNotification } from "../../../context/NotificationProvider";
import { logo } from '../../../utils/Constants';
const inner = {
    name: "",
    imgUrl: logo,
    description: ""
}
const innerError = {
    name: "",
    description: ""
}
function Actor(props) {
    const [errors, setErrors] = useState(innerError);
    const [open, setOpen] = useState(false);
    const [idxoa, setIdxoa] = useState(null);
    const [actor, setActor] = useState(inner);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5); // Số hàng mỗi trang
    const [openDelete, setOpenDelete] = useState(false);
    const actors = useContext(ContextActors);
    const showNotification = useNotification();
    const [searchTerm, setSearchTerm] = useState('');

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setActor({ ...actor, imgUrl: reader.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const validation = () => {
        const newError = {};
        newError.name = actor.name ? "" : "vui long nhap name";
        newError.description = actor.description ? "" : "vui long nhap discription";
        setErrors(newError);
        console.log(newError);
        return Object.values(newError).every((error) => error === '');
    }

    const handleSubmit = async () => {
        if (!validation()) return;
        if (actor.id) {
            await updateDocument('Actors', actor);
            showNotification('Actor updated successfully!', "info");
        } else {
            console.log("BFDBDF");
            await addDocument("Actors", actor);
            showNotification('Actor add successfully!', "success");
        };
        handleClose();
    }

    const handleOpen = () => {
        setErrors(inner);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setActor({ ...actor, [name]: value });
    };
    const deleteItem = async () => {
        await deleteDocument('Actors', idxoa);
        showNotification('Actor deleted successfully!', "error");
        setOpenDelete(false);
    }
    const resetModal = () => {
        setActor(inner);
        setErrors(inner)
        handleOpen();
    }
    // Hàm xử lý tìm kiếm
    const filtered = actors?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
        <div >
            <div className='flex items-center justify-between'>
            <h1>List Actors</h1>
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
                <Button onClick={resetModal} variant="contained">ADD ACTOR</Button>
            </div>
            <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Name Actor</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToShow.map((row, index) => (
                            <TableRow key={index + 1}>
                                <TableCell component="th" scope="row">
                                    {page * rowsPerPage + index + 1} {/* Đánh số thứ tự trên từng trang */}
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>
                                    <Avatar
                                        src={row?.imgUrl}
                                        alt="Actor Image"
                                        sx={{ width: 50, height: 50 }}
                                    />

                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => { handleOpen(); setActor(row); }} color="primary">
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
                    count={actor.length} // Tổng số hàng
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]} // Tùy chọn số hàng mỗi trang
                />
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle> {actor.id ? "Edit Actor" : "Add Actor"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Name Actor"
                        type="text"
                        fullWidth
                        value={actor.name}
                        name='name'
                        onChange={handleInput}
                        error={!!errors.name}
                        helperText={errors.description}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        type="text"
                        fullWidth
                        multiline
                        rows={3}
                        value={actor.description}
                        name="description"
                        onChange={handleInput}
                        error={!!errors.description}
                        helperText={errors.description}
                    />

                    <Typography variant="subtitle1" style={{ marginTop: '15px' }}>Avatar</Typography>
                    <Avatar
                        src={actor?.imgUrl}
                        alt="Actor Image"
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

export default Actor;