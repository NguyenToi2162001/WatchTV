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
import { ContextPeatures } from '../../../context/PeaturesProvider';
import { getObjectById } from '../../../services/ResponsitoryService'
const inner = {
    planID: "",
    text: "",
    availiable: "",
};
const innerError = {
    planID: "",
    text: "",
    availiable: "",
}
function Peature() {
    const [open, setOpen] = useState(false);
    const [idxoa, setIdxoa] = useState(null);
    const [peature, setPeature] = useState(inner);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDelete, setOpenDelete] = useState(false);
    const peatures = useContext(ContextPeatures);
    const showNotification = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState(innerError);
    const plans = useContext(ContextPlans);
    const movies = useContext(ContextMovies);
    const handleSubmit = async () => {
        // if (!validation()) return;

        if (peature.id) {
            await updateDocument('Peatures', peature);
            showNotification('Peature updated successfully!', "info");
        } else {
            await addDocument("Peatures", peature);
            showNotification('Peature added successfully!', "success");
        }

        handleClose();
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPeature(inner);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPeature({ ...peature, [name]: value });
    };

    const deleteItem = async () => {
        await deleteDocument('Peatures', idxoa);
        showNotification('Peature deleted successfully!', "error");
        setOpenDelete(false);
    };

    const filtered = peatures?.filter((item) =>
        item.text?.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1>List Peatures</h1>
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
                <Button onClick={handleOpen} variant="contained">ADD PEATURE</Button>
            </div>
            <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>PlanID</TableCell>
                            <TableCell>Text</TableCell>
                            <TableCell>Availiable</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToShow.map((row, index) => (
                            <TableRow key={row.id || index}>
                                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                <TableCell>{getObjectById(row.planID, plans).title}</TableCell>
                                <TableCell>{row.text}</TableCell>
                                <TableCell>{row.availiable}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => { handleOpen(); setPeature(row); }} color="primary">
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
                <DialogTitle>{peature.id ? "Edit Peature" : "Add Peature"}</DialogTitle>
                <DialogContent>
                    {/* Select Plan ID */}
                    <FormControl sx={{ mt: 1 }} fullWidth>
                        <InputLabel id="my-select-label">Plan ID</InputLabel>
                        <Select
                            labelId="my-select-label"
                            label="Chọn giá trị"
                            name="planID"
                            value={peature.planID}
                            onChange={handleInput}
                            error={!!errors.planID}
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

                    {/* Select Availiable */}
                    <FormControl sx={{ mt: 2 }} fullWidth>
                        <InputLabel id="availiable-select-label">Availiable</InputLabel>
                        <Select
                            labelId="availiable-select-label"
                            label="Chọn trạng thái"
                            name="availiable"
                            value={peature.availiable}
                            onChange={handleInput}
                        >
                            <MenuItem value="yes">Yes</MenuItem>
                            <MenuItem value="no">No</MenuItem>
                        </Select>
                    </FormControl>

                    {/* TextField cho Text */}
                    <TextField
                        margin="dense"
                        label="Text"
                        type="text"
                        fullWidth
                        value={peature.text}
                        name="text"
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

export default Peature;
