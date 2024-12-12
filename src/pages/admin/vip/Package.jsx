import { useContext, useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, TableContainer, Paper, Table,
    TableHead, TableRow, TableCell, TableBody, IconButton,
    InputAdornment, Tooltip, TablePagination, FormControl, InputLabel, Select, MenuItem
} from '@mui/material';
import { CiSearch } from "react-icons/ci";
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import ModalDelete from '../../../components/ModalDelete';
import { addDocument, deleteDocument, updateDocument } from '../../../services/FirebaseService';
import { ContextPlans } from '../../../context/PlansProvider';
import { useNotification } from "../../../context/NotificationProvider";
import { ContextMovies } from '../../../context/MoviesProvider';
import { getObjectById } from '../../../services/ResponsitoryService'
import { ContextPackages } from '../../../context/PackagesProvider';
const inner = {
    discount: "",
    planID: "",
    time: "",
};
const innerError = {
    discount: "",
    planID: "",
    time: "",
}
function Package() {
    const [open, setOpen] = useState(false);
    const [idxoa, setIdxoa] = useState(null);
    const [Package, setPackage] = useState(inner);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDelete, setOpenDelete] = useState(false);
    const packages = useContext(ContextPackages);
    const showNotification = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState(innerError);
    const plans = useContext(ContextPlans);
    const movies = useContext(ContextMovies);
    const handleSubmit = async () => {
        // if (!validation()) return;

        if (Package.id) {
            await updateDocument('Packages', Package);
            showNotification('Package updated successfully!', "info");
        } else {
            await addDocument("Packages", Package);
            showNotification('Package added successfully!', "success");
        }

        handleClose();
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPackage(inner);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPackage({ ...Package, [name]: value });
    };

    const deleteItem = async () => {
        await deleteDocument('Packages', idxoa);
        showNotification('Package deleted successfully!', "error");
        setOpenDelete(false);
    };

    const filtered = packages?.filter((item) =>
        item.discount?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const rowsToShow = (filtered || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    const handleChangePage = (event, newPage) => setPage(newPage);
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <div>
            <div className='flex items-center justify-between'>
                <h1>List Packages</h1>
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
                <Button onClick={handleOpen} variant="contained">ADD PACKAGE</Button>
            </div>
            <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>PlanID</TableCell>
                            <TableCell>Discount</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToShow.map((row, index) => (
                            <TableRow key={row.id || index}>
                                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                <TableCell>{getObjectById(row.planID, plans).title}</TableCell>
                                <TableCell>{row.discount}</TableCell>
                                <TableCell>{row.time}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => { handleOpen(); setPackage(row); }} color="primary">
                                            <MdEdit className='bg-blue-700 text-white p-1 border rounded-lg' />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => { setOpenDelete(true); setIdxoa(row.id); }} color="secondary">
                                            <RiDeleteBin5Fill className='bg-red-700 text-white p-1 border rounded-lg' />
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={filtered?.length || 0}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{Package.id ? "Edit Package" : "Add Package"}</DialogTitle>
                <DialogContent>
                    <TextField
                        margin="dense"
                        label="Discount"
                        type="text"
                        fullWidth
                        value={Package.discount}
                        name="discount"
                        onChange={handleInput}
                    />
                    <FormControl sx={{ mt: 1 }} fullWidth>
                        <InputLabel id="my-select-label">Plan ID</InputLabel>
                        <Select
                            labelId="my-select-label"
                            label="Chọn giá trị"
                            name='planID'
                            value={Package.planID}
                            onChange={handleInput}
                            error={!!errors.planID}
                            helperText={errors.planID}
                        >
                            {plans
                                ?.slice() // Tạo bản sao để tránh thay đổi mảng gốc
                                .sort((a, b) => a.lever - b.lever) // Sắp xếp tăng dần theo lever
                                .map((row, index) => (
                                    <MenuItem key={index} value={row.id}>
                                        {row.title}
                                    </MenuItem>
                                ))}
                        </Select>
                    </FormControl>
                    <TextField
                        margin="dense"
                        label="Time"
                        type="text"
                        fullWidth
                        value={Package.time}
                        name="time"
                        onChange={handleInput}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">Cancel</Button>
                    <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
                </DialogActions>
            </Dialog>
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} deleteItem={deleteItem} />
        </div>
    );
}

export default Package;
