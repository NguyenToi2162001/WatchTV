import React, { useContext } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { FaPlayCircle } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { ContextMovies } from "../../../context/MoviesProvider";
import { ContextPlans } from "../../../context/PlansProvider";
import {  getObjectById } from "../../../services/ResponsitoryService";
function SlideEmotional({title, data}) {
    const plans = useContext (ContextPlans);
    return (
        <div>
            <h1 className="text-xl text-white font-bold bg-black py-6 ps-3">{title}</h1>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={8}
                slidesPerView={2}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                breakpoints={{
                    640: { // Tablet (640px - 1023px)
                        slidesPerView: 3, // Hiển thị 3 hình trên tablet
                    },
                    1024: { // Desktop (>= 1024px)
                        slidesPerView: 5, // Hiển thị 5 hình trên desktop/laptop
                    },
                }}
            >
                {data.map((element, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative group" key={index}>
                            <img
                                className="w-full  object-cover"
                                src={element.imgUrl}
                                alt="#"
                            />
    
                            {/* Thẻ div hiện khi hover */}
                            <div
                                className="absolute bottom-0 bg-black 
                     bg-opacity-50 opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 
                     transition-all duration-500 ease-out w-full p-2"
                            >
                                <div className="flex items-center justify-around text-white">
                                    <FaPlayCircle size={25} className="hover:text-teal-400 transition-colors duration-300" />
                                    <FaHeart size={25} className="hover:text-red-400 transition-colors duration-300" />
                                    <FaPlus size={25} className="hover:text-amber-400 transition-colors duration-300"/>
                                </div>
                                <div className="ms-2 mt-2 flex justify-center">
                                    <h1 className="text-sm text-white font-bold">{element.name}</h1>
                                </div>
                                <div className="ms-2 flex justify-center">
                                    <h1 className="text-sm text-white">{getObjectById(element.planID,plans)?.title}</h1>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default SlideEmotional;