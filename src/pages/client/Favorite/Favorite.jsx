import React, { useContext, useState } from 'react';
import { BiFoodMenu } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { ContextFavorites } from '../../../context/FavoritesProvider';
import { ContextMovies } from '../../../context/MoviesProvider';
import { useAuth } from '../../../context/AuthsProvider';
import { ImCancelCircle } from "react-icons/im";
import {deleteDocument} from '../../../services/FirebaseService'
import { useNotification } from "../../../context/NotificationProvider";
import ModalDelete from '../../../components/ModalDelete';
function Favorite(props) {
    const favorites = useContext(ContextFavorites);
    const movies = useContext(ContextMovies);
    const { user } = useAuth();
    const userId = user?.id;
    const[idxoa , setIdxoa]= useState("");
    const [openDelete, setOpenDelete] = useState(false);
    const showNotification = useNotification();
    // Tạo danh sách các bộ phim yêu thích
    const list = favorites.map(favorite => {
        return movies?.find(movie => movie?.id === favorite?.movieID);
    }).filter(movie => movie !== undefined); // Loại bỏ các phần tử không tồn tại
    
    // Kiểm tra nếu có phần tử nào trong favorites có accountId trùng với userId
    const isUserMatch = favorites?.some(movie => movie?.accountId === userId);
   
    console.log(idxoa);
    
    const deleteItem = async () => {
        await deleteDocument('Favorites', idxoa);
        showNotification('Movie deleted successfully!', "error");
        setOpenDelete(false);

    }
    return (
        <div className="md:flex justify-between bg-slate-700 p-5">
            <div>
                <div className="flex items-center gap-4">
                    <BiFoodMenu size={20} className="text-white" />
                    <p className="text-white">Danh Sách Yêu Thích</p>
                </div>

                {/* Kiểm tra nếu có phần tử trùng với userId */}
                {isUserMatch ? (
                    <div className="grid grid-cols-3 gap-4"> {/* Tạo grid với 3 cột */}
                        {list.map((movie, index) => (
                            <div key={index} className="flex justify-center relative">
                                <img
                                    className="w-36 h-36 object-cover rounded-lg mt-3"
                                    src={movie?.imgUrl}
                                    alt="movie poster"
                                />
                                <ImCancelCircle onClick={() => { setOpenDelete(true); setIdxoa(favorites.id); }}className='absolute top-1 -right-2 text-red-600 text-xl cursor-pointer' />

                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white">Không tìm thấy</p>
                )}

            </div>

            <div>
                <div className="flex items-center gap-4">
                    <FaHistory size={20} className="text-white" />
                    <p className="text-white">Lịch sử xem phim của bạn</p>
                </div>
                <div className='flex justify-between gap-3 text-white'>
                    <img
                        className="w-36 h-36 object-cover rounded-lg mt-3"
                        src="https://iguov8nhvyobj.vcdn.cloud/media/catalog/product/cache/1/image/1800x/71252117777b696995f01934522c402d/6/4/640x396_venom3.jpg"
                        alt=""
                    />
                    <div>
                        <p className='font-bold text-2xl'>Venom</p>
                        <p>"Venom là bộ phim chiếu rạp hay"</p>
                    </div>
                    <p className='font-bold'>Full HD</p>
                </div>
                <hr className='mt-3' />
            </div>
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} deleteItem={deleteItem} />
        </div>
    );
}

export default Favorite;
