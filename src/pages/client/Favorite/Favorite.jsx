import React, { useContext, useState } from 'react';
import { BiFoodMenu } from "react-icons/bi";
import { FaHistory } from "react-icons/fa";
import { ContextFavorites } from '../../../context/FavoritesProvider';
import { ContextMovies } from '../../../context/MoviesProvider';
import { useAuth } from '../../../context/AuthsProvider';
import { ImCancelCircle } from "react-icons/im";
import { deleteDocument } from '../../../services/FirebaseService'
import { useNotification } from "../../../context/NotificationProvider";
import ModalDelete from '../../../components/ModalDelete';
import { getFavoriteMovieById, getMovieWatchedById } from '../../../services/ResponsitoryService';
import { ContextMovieWatchs } from '../../../context/MovieWatchedProvider';
function Favorite(props) {
    const favorites = useContext(ContextFavorites);
    const movies = useContext(ContextMovies);
    const { user } = useAuth();
    const moviewatcheds = useContext(ContextMovieWatchs);
    const userId = user?.id;
    const [idxoa, setIdxoa] = useState(null)
    const [openDelete, setOpenDelete] = useState(false);
    const showNotification = useNotification();

    const list = favorites
        .filter(favorite => favorite.accountId === userId)
        .map(favorite => movies?.find(movie => movie?.id === favorite?.movieID))
        .filter(movie => movie !== undefined);

    const listMovieWatched = moviewatcheds
        .filter(moviewatched => moviewatched.accountId === userId)
        .map(moviewatched => movies?.find(movie => movie?.id === moviewatched?.movieID))
        .filter(movie => movie !== undefined);
    const isUserMatch = favorites?.some(movie => movie?.accountId === userId);

    const deleteItem = async () => {
        await deleteDocument('Favorites', idxoa);
        showNotification('Movie deleted successfully!', "error");
        setOpenDelete(false);

    }

    //Tạo danh sách các bộ phim đã xem



    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-700 p-4 md:p-6 rounded-lg shadow-lg">
            {/* Danh Sách Yêu Thích */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-4">
                    <BiFoodMenu size={20} className="text-white" />
                    <p className="text-white text-lg font-semibold">Danh Sách Yêu Thích</p>
                </div>
                {isUserMatch ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {list.map((movie, index) => (
                            <div key={index} className="relative flex justify-center">
                                <img
                                    className="w-32 h-32 sm:w-36 sm:h-36 object-cover rounded-lg mt-3 shadow-md hover:scale-105 transition-transform duration-300"
                                    src={movie?.imgUrl}
                                    alt="movie poster"
                                />
                                <ImCancelCircle
                                    onClick={() => {
                                        setOpenDelete(true);
                                        setIdxoa(getFavoriteMovieById(movie.id, favorites).id);
                                    }}
                                    className="absolute top-1 right-7 text-red-400 text-2xl cursor-pointer hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-center mt-4">Không tìm thấy</p>
                )}
            </div>

            {/* Lịch sử xem phim */}
            <div className="p-4">
                <div className="flex items-center gap-4 mb-4">
                    <FaHistory size={20} className="text-white" />
                    <p className="text-white text-lg font-semibold">Lịch sử xem phim của bạn</p>
                </div>
                {isUserMatch ? (
                    <div className="space-y-4">
                        {listMovieWatched.map((movie, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-slate-800 rounded-lg shadow-md hover:bg-slate-600 transition-colors duration-300"
                            >
                                <img
                                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                                    src={movie.imgUrl}
                                    alt="movie poster"
                                />
                                <div className="flex-1 text-center sm:text-left">
                                    <p className="text-white font-bold text-base sm:text-lg">{movie.name}</p>
                                    <p className="text-white text-sm">{movie.description}</p>
                                </div>
                                <p className="text-white font-bold text-sm sm:text-base">Full HD</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-white text-center mt-4">Không tìm thấy</p>
                )}
                <hr className="mt-6 border-slate-600" />
            </div>

            {/* Modal Delete */}
            <ModalDelete openDelete={openDelete} setOpenDelete={setOpenDelete} deleteItem={deleteItem} />
        </div>


    );
}

export default Favorite;
