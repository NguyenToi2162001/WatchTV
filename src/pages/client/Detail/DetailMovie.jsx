import { CiPlay1 } from "react-icons/ci";
import Button from '@mui/material/Button';
import { CiHeart } from "react-icons/ci";
import { IoEyeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import Slideshow from '../Slideshow/Slideshow';
import { getMoviesRents } from "../../../services/ResponsitoryService";
import { ContextMovies } from "../../../context/MoviesProvider";
import { ContextPlans } from "../../../context/PlansProvider";
import React, { useContext } from 'react';
import { Link } from "react-router-dom";
function DetailMovie(props) {
    const movies = useContext(ContextMovies);
    const plans = useContext(ContextPlans);
    const moviesRents = getMoviesRents(plans, movies, "3");
    const moviesVipSS = getMoviesRents(plans, movies, "4");
    return (
        <div>
            <div className="relative h-screen">
                {/* Hình ảnh chiếm toàn bộ chiều cao màn hình */}
                <img
                    src="https://cellphones.com.vn/sforum/wp-content/uploads/2023/05/phim-chieu-rap-1.jpg"
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="absolute top-1/2 left-20 transform  -translate-y-1/2 text-center px-4">

                    {/* Tiêu đề phim */}
                    <div className="md:w-1/2 w-2/3 mt-3 text-sm sm:text-sm md:text-lg lg:text-lg text-slate-800 font-bold animate__animated animate__backInUp">
                        <p className="text-start"> Gặp Lại Chị Bầu</p>
                        <p className="text-start">Duration : 120</p>
                        <h1 className="text-start">"Gặp lại chị bầu là một bộ phim điện ảnh Việt Nam thuộc thể loại hài lãng mạn – chính kịch ra mắt vào năm 2024  " </h1>
                        <div className="flex justify-start mt-3">
                            <Link to="/Detail/PlayMovie">
                                <Button
                                    className="bg-blue-600 text-white p-3 text-start "
                                    variant="contained"
                                >
                                    Watch Movie
                                </Button>
                            </Link>
                        </div>
                        <div className="flex items-center mt-3">
                            <CiHeart />
                            <p className="ms-3">0</p>
                            <IoEyeOutline className="ms-3" />
                            <p className="ms-3">0</p>
                            <FaPlus className="ms-3" />
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