import { CiPlay1 } from "react-icons/ci";
import Button from '@mui/material/Button';
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Slideshow from '../Slideshow/Slideshow';
import { getMoviesRents, getObjectById ,getAllCommentById } from "../../../services/ResponsitoryService";
import { ContextMovies } from "../../../context/MoviesProvider";
import { ContextPlans } from "../../../context/PlansProvider";
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { addDocument } from '../../../services/FirebaseService';
import { useAuth } from '../../../context/AuthsProvider';
import { ContextLikes } from "../../../context/LikesProvider";
import { ContextMovieWatchs} from '../../../context/MovieWatchedProvider';
function DetailMovie(props) {
    const { user } = useAuth();
    let { id } = useParams();
    const inner = {
        movieID: id,
        accountId: user?.id,
        time: new Date().toISOString(), // Lấy thời gian hiện tại
    }  
    const [movieWatched, setMovieWatched] = useState(inner)
    const movies = useContext(ContextMovies);
    const listWatchs = useContext(ContextMovieWatchs);
    const plans = useContext(ContextPlans);
    const moviesRents = getMoviesRents(plans, movies, "3");
    const moviesVipSS = getMoviesRents(plans, movies, "4");
    const likes = useContext(ContextLikes);
    const listLike = getAllCommentById(id,likes);
    const moviewatched = getAllCommentById (id,listWatchs);

    
    
  

    
    window.scrollTo({
        top: 0,
        behavior: "smooth", // Cuộn mượt
    });

    const addMovieWatched = async () => {
        await addDocument("MovieWatchs", movieWatched);
    }

    return (
        <div>
            <div className="relative h-screen">
                {/* Hình ảnh chiếm toàn bộ chiều cao màn hình */}
                <img
                    src={getObjectById(id, movies)?.imgUrl}
                    alt=""
                    className="w-full h-full object-cover object-center"
                />
                <div className="absolute top-1/2 left-20 transform -translate-y-1/2 text-center px-4">
                    {/* Nội dung thông tin phim */}
                    <div className="mt-3 text-sm md:text-lg lg:text-lg text-white font-bold animate__animated animate__backInUp space-y-4">
                        {/* Tên phim */}
                        <p className="text-start text-2xl font-extrabold text-teal-400">{getObjectById(id, movies)?.name}</p>

                        {/* Thời lượng phim */}
                        <div className="flex items-center space-x-2">
                            <p className="text-start font-bold text-white">Duration:</p>
                            <p className="text-white">{getObjectById(id, movies)?.duration}</p>
                        </div>

                        {/* Mô tả phim */}
                        <h1 className="text-start text-white leading-relaxed">
                            {getObjectById(id, movies)?.description}
                        </h1>

                        {/* Nút xem phim */}
                        <div className="flex justify-start mt-3">

                            <Link to={`/Detail/PlayMovie/${id}`}>
                                <button onClick={addMovieWatched}
                                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md shadow-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    Watch Movie
                                </button>
                            </Link>
                        </div>
                        {/* Tương tác */}
                        <div className="flex items-center space-x-6 mt-3 text-gray-400">
                            <div className="flex items-center space-x-2">
                                <CiHeart className="text-red-500 text-xl cursor-pointer hover:scale-110 transition-transform" />
                                <p>{listLike.length}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <IoEyeOutline className="text-green-400 text-xl cursor-pointer hover:scale-110 transition-transform" />
                                <p>{moviewatched.length}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaPlus className="text-yellow-400 text-xl cursor-pointer hover:scale-110 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Slideshow data={moviesRents} title="Phim Hot Hôm Nay" />
            <Slideshow data={moviesVipSS} title="Phim Hot Khuyến Mãi" />
        </div>
    );
}

export default DetailMovie;