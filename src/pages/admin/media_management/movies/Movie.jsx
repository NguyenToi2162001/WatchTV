import React from 'react';
import {
    TextField, Button,Avatar,  InputAdornment, Tooltip
} from '@mui/material';
import { MdEdit } from "react-icons/md";
import { BiSolidCategory } from "react-icons/bi";
import { FaUserAstronaut } from "react-icons/fa";
import {
    TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton,
    Snackbar, Alert, TablePagination
} from '@mui/material';
import { addDocument, deleteDocument, updateDocument } from '../../../../services/FirebaseService';
import ModalDelete from '../../../../components/ModalDelete';
import { useNotification } from "../../../../context/NotificationProvider";
import { CiSearch } from "react-icons/ci";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useContext, useState } from 'react';
import { ContextCategories } from '../../../../context/CategoriesProvider';
import { ContextActors } from '../../../../context/ActorsProvider';
import { ContextAuthors } from '../../../../context/AuthorProvider';
import { ContextCharactors } from '../../../../context/CharactorsProvider';
import { ContextPlans } from '../../../../context/PlansProvider';
import { ContextMovies } from '../../../../context/MoviesProvider';
import { getObjectById } from '../../../../services/ResponsitoryService';
import { logo } from '../../../../utils/Constants';
import ModalChoose from './ModalChoose';
import ModalMovie from './ModalMovie';
const inner = {
    name: "",
    description: "",
    duration: "",
    authorID: "",
    planID: "",
    listCate: [],
    listActor: [],
    listCharacter: [],
    rentalPrice: 0,
    likesCount : 0,
    viewsCount : 0,
    date : new Date (),
    imgUrl: logo
};
const innerError = {
    name: "",
    description: "",
    duration: "",
    authorID: "",
    planID: "",
    listCate: [],
}

function Movie(props) {
    const [idxoa, setIdxoa] = useState(null);
    const [openDelete, setOpenDelete] = useState(false);
    const [errors, setErrors] = useState(innerError);
    const [movie, setMovie] = useState(inner)
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [dataChoose, setDataChoose] = useState([]);
    const [chooseType, setChooseType] = useState("");
    const [openChoose, setOpenChoose] = useState(false);
    const categories = useContext(ContextCategories);
    const characters = useContext(ContextCharactors);
    const actors = useContext(ContextActors);
    const plans = useContext(ContextPlans);
    const authors = useContext(ContextAuthors);
    const showNotification = useNotification();
    const movies = useContext(ContextMovies);
    const [searchTerm, setSearchTerm] = useState('');
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    }
    const resetModal = () => {
        setMovie(inner);
        setErrors(inner)
        handleOpen();
    }

    const handleChoose = (type) => {
        setChooseType(type);
        switch (type) {
            case "categories":
                setDataChoose(categories);
                break;
            case "actors":
                setDataChoose(actors);
                break;
            case "characters":
                setDataChoose(characters);
                break;
            default:
                setDataChoose([]);
        }
        setOpenChoose(true);
    };

    const toggleSelection = (list, item) => {
        return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
    };

    const getSelectedItems = () => {
        switch (chooseType) {
            case "categories":
                return movie.listCate;
            case "actors":
                return movie.listActor;
            case "characters":
                return movie.listCharacter;
            default:
                return [];
        }
    };

    const handleSelect = (item, type) => {
        setMovie(prevData => {
            let updatedList;
            switch (type) {
                case "categories":
                    updatedList = toggleSelection(prevData.listCate, item);
                    return { ...prevData, listCate: updatedList };
                case "actors":
                    updatedList = toggleSelection(prevData.listActor, item);
                    return { ...prevData, listActor: updatedList };
                case "characters":
                    updatedList = toggleSelection(prevData.listCharacter, item);
                    return { ...prevData, listCharacter: updatedList };
                default:
                    return prevData;
            }
        });
    };

    const validation = () => {
        const newError = {
            ...innerError, // Khởi tạo trạng thái lỗi dựa trên cấu trúc mẫu
        };

        // Kiểm tra từng trường với điều kiện cụ thể
        newError.name = movie.name?.trim()
            ? ""
            : "Vui lòng nhập tên phim (name).";

        newError.description = movie.description?.trim()
            ? ""
            : "Vui lòng nhập mô tả (description).";

        newError.duration = movie.duration?.trim() && !isNaN(movie.duration)
            ? ""
            : "Vui lòng nhập thời lượng hợp lệ (duration).";

        newError.authorID = movie.authorID
            ? ""
            : "Vui lòng chọn Author (authorID).";

        newError.planID = movie.planID
            ? ""
            : "Vui lòng chọn Plan (planID).";

        newError.listCate = Array.isArray(movie.listCate) && movie.listCate.length > 0
            ? ""
            : "Vui lòng thêm ít nhất một Category (listCate).";

        // Cập nhật trạng thái lỗi
        setErrors(newError);

        // Debug lỗi (nếu cần)
        console.log("Validation Errors:", newError);

        // Trả về `true` nếu tất cả trường đều hợp lệ
        return Object.values(newError).every((error) => error === "");
    };


    const handleSubmit = async () => {
        if (!validation()) return;
        if (movie.id) {
            await updateDocument('Movies', movie);
            showNotification('Movie updated successfully!', "info");
        } else {

            console.log("BFDBDF");
            await addDocument("Movies", movie);
            showNotification('Movie add successfully!', "success");

        };
        handleClose();
    }
    const deleteItem = async () => {
        await deleteDocument('Movies', idxoa);
        showNotification('Movies deleted successfully!', "error");
        setOpenDelete(false);
    }
    // Hàm xử lý tìm kiếm
    const filtered = movies?.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
                <h1>List Movies</h1>
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
                <Button onClick={resetModal} variant="contained">ADD MOVIE</Button>
            </div>
            <TableContainer className='mt-7' component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Name Movie</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Author</TableCell>
                            <TableCell>Plan</TableCell>
                            <TableCell>Categories</TableCell>
                            <TableCell>Entities</TableCell>
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
                                    <Avatar
                                        src={row?.imgUrl}
                                        alt="Actor Image"
                                        sx={{ width: 50, height: 50,borderRadius: 0  }}
                                    />
                                </TableCell>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.duration}</TableCell>
                                <TableCell>{getObjectById(row.authorID, authors)?.name}</TableCell>
                                <TableCell>{getObjectById(row.planID, plans)?.title}</TableCell>
                                <TableCell >
                                    <Tooltip
                                        title={
                                            row.listCate?.map((e) => getObjectById(e, categories)?.nameCategory || "N/A").join(", ")
                                        }
                                        placement="top"
                                    >
                                        <Button variant="contained">
                                            <BiSolidCategory />
                                        </Button>
                                    </Tooltip>
                                </TableCell>
                                <TableCell >
                                    <Tooltip
                                        title={
                                            <div className="grid grid-cols-4 gap-2">
                                                {row.listCharacter?.map((e, index) => (
                                                    <img
                                                        key={index}
                                                        className="w-10 h-10 rounded-full"
                                                        src={getObjectById(e, characters)?.imgUrl}
                                                        alt=""
                                                    />
                                                ))}
                                                {row.listActor?.map((e, index) => (
                                                    <img
                                                        key={index}
                                                        className="w-10 h-10 rounded-full"
                                                        src={getObjectById(e, actors)?.imgUrl}
                                                        alt=""
                                                    />
                                                ))}
                                            </div>
                                        }
                                        placement="top"
                                    >
                                        <Button variant="contained">
                                        <FaUserAstronaut />
                                        </Button>
                                    </Tooltip>

                                </TableCell>
                                <TableCell >
                                    <IconButton onClick={() => { handleOpen(); setMovie(row); }} color="primary">
                                        <MdEdit />
                                    </IconButton>
                                    <IconButton onClick={() => { setOpenDelete(true); setIdxoa(row.id); }} color="secondary" >
                                        <RiDeleteBin5Fill />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={movie.length} // Tổng số hàng
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]} // Tùy chọn số hàng mỗi trang
                />
            </TableContainer>

            <ModalMovie errors={errors} setErrors={setErrors} handleSubmit={handleSubmit} movie={movie} setMovie={setMovie} setChooseType={setChooseType} handleSelect={handleSelect} open={open} handleClose={handleClose} handleChoose={handleChoose} />
            <ModalChoose selectedItems={getSelectedItems()} onSelect={handleSelect} openChoose={openChoose} dataChoose={dataChoose} setOpenChoose={setOpenChoose} chooseType={chooseType} />
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} deleteItem={deleteItem} />
        </div>

    );
}
export default Movie;