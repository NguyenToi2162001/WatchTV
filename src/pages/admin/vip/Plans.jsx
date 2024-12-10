import { useContext, useEffect, useState } from 'react';
import {
    Dialog, DialogTitle, DialogContent, DialogActions,
    TextField, Button, TableContainer, Paper, Table,
    TableHead, TableRow, TableCell, TableBody, IconButton,
    InputAdornment, Tooltip, TablePagination
} from '@mui/material';
import { CiSearch } from "react-icons/ci";
import { MdEdit } from 'react-icons/md';
import { RiDeleteBin5Fill } from 'react-icons/ri';
import ModalDelete from '../../../components/ModalDelete';
import { addDocument, deleteDocument, updateDocument } from '../../../services/FirebaseService';
import { ContextPlans } from '../../../context/PlansProvider';
import { useNotification } from "../../../context/NotificationProvider";

const inner = { lever: "", pricePerMonth: "", title: "" };
const innerError = {
    lever: "", pricePerMonth: "", title: "" 
}
function Plans() {
    const [open, setOpen] = useState(false);
    const [idxoa, setIdxoa] = useState(null);
    const [plan, setPlan] = useState(inner);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDelete, setOpenDelete] = useState(false);
    const plans = useContext(ContextPlans);
    const showNotification = useNotification();
    const [searchTerm, setSearchTerm] = useState('');
    const [errors, setErrors] = useState(innerError);
    const validation = () => {
        return plan.lever && plan.pricePerMonth && plan.title;
    };

    const handleSubmit = async () => {
        if (!validation()) return;

        if (plan.id) {
            await updateDocument('Plans', plan);
            showNotification('Plan updated successfully!', "info");
        } else {
            await addDocument("Plans", plan);
            showNotification('Plan added successfully!', "success");
        }

        handleClose();
    };

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        setPlan(inner);
    };

    const handleInput = (event) => {
        const { name, value } = event.target;
        setPlan({ ...plan, [name]: value });
    };

    const deleteItem = async () => {
        await deleteDocument('Plans', idxoa);
        showNotification('Plan deleted successfully!', "error");
        setOpenDelete(false);
    };

    const filtered = plans?.filter((item) =>
        item.title?.toLowerCase().includes(searchTerm.toLowerCase())
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
                <h1>List Plans</h1>
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
                <Button onClick={handleOpen} variant="contained">ADD PLAN</Button>
            </div>
            <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Lever</TableCell>
                            <TableCell>Price Per Month</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rowsToShow.map((row, index) => (
                            <TableRow key={row.id || index}>
                                <TableCell>{index + 1 + page * rowsPerPage}</TableCell>
                                <TableCell>{row.lever}</TableCell>
                                <TableCell>{row.pricePerMonth}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton onClick={() => { handleOpen(); setPlan(row); }} color="primary">
                                            <MdEdit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton onClick={() => { setOpenDelete(true); setIdxoa(row.id); }} color="secondary">
                                            <RiDeleteBin5Fill />
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
                <DialogTitle>{plan.id ? "Edit Plan" : "Add Plan"}</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Lever"
                        type="number"
                        fullWidth
                        value={plan.lever}
                        name='lever'
                        onChange={handleInput}
                        error={!!errors.name}
                        helperText={errors.description}
                    />
                    <TextField
                        margin="dense"
                        label="Price Per Month"
                        type="text"
                        fullWidth
                        value={plan.pricePerMonth}
                        name="pricePerMonth"
                        onChange={handleInput}
                    />
                    <TextField
                        margin="dense"
                        label="Title"
                        type="text"
                        fullWidth
                        value={plan.title}
                        name="title"
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

export default Plans;
