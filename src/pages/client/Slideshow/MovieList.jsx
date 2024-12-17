import React, { useContext } from 'react';
import { FaPlayCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { ContextMovies } from "../../../context/MoviesProvider";
import { ContextPlans } from "../../../context/PlansProvider";
import { getObjectById } from "../../../services/ResponsitoryService";
function MovieList({ title, data }) {
    const movies = useContext(ContextMovies);
    const plans = useContext(ContextPlans);
    return (
        <div className='bg-black'>
            <h1 className="text-2xl text-teal-500 font-bold bg-black py-3 ps-3">{title}</h1>
            <div className="grid grid-cols-2 p-15 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 md:p-9">
                {data.map((element) => (
                    <div className="relative group">
                        <div className="relative overflow-hidden w-10/12 h-5/6">
                            <img
                                className="object-cover rounded-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                                src={element.imgUrl}
                                alt="#"
                            />
                        </div>


                        {/* Thẻ div hiện khi hover */}
                        <div
                            className="absolute bottom-10 bg-black 
                      bg-opacity-75 opacity-0 translate-y-5 group-hover:opacity-100 group-hover:translate-y-0 
                      transition-all duration-500 ease-out p-4 rounded-b-lg w-10/12  "
                        >
                            {/* Các icon được căn giữa */}
                            <div className="flex items-center justify-center gap-6 text-white">
                                <FaPlayCircle size={30} className="hover:text-teal-400 transition-colors duration-300" />
                                <FaHeart size={30} className="hover:text-red-400 transition-colors duration-300" />
                                <FaPlus size={30} className="hover:text-amber-400 transition-colors duration-300" />
                            </div>

                            {/* Tiêu đề của phim */}
                            <div className="mt-5 flex flex-col items-center text-center">
                                <h1 className="text-white font-bold text-xl ">{element.name}</h1>
                                <h1 className="text-teal-400 font-semibold text-lg mt-2">
                                    {getObjectById(element.planID, plans)?.title}
                                </h1>
                            </div>
                        </div>
                    </div>

                ))}
            </div>
        </div>
    );
}

export default MovieList;