import React, { useContext, useEffect, useState } from 'react';
import Slider from 'react-slick';
import { CiPlay1 } from "react-icons/ci";
import Button from '@mui/material/Button';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'; // Icon cho nút
import { TfiVideoClapper } from "react-icons/tfi";
import SlideEmotional from '../Slideshow/SlideEmotional';
import { ContextMovies } from "../../../context/MoviesProvider";
import { getMoviesRents } from "../../../services/ResponsitoryService";
import { ContextPlans } from "../../../context/PlansProvider";
import Slideshow from '../Slideshow/Slideshow';
function Rentedmovies(props) {
    const movies = useContext(ContextMovies);
    const plans = useContext(ContextPlans);
    const moviesVipSSS = getMoviesRents(plans, movies, "1");
    const moviesRents = getMoviesRents(plans, movies, "4")
    const moviesGiadinh = getMoviesRents(plans, movies, "3")
    const moviess = [
        { id: 1, title: "Đừng xem nếu bạn không muốn khóc . Muốn chăm sóc bà khi bà Ngoại khi bà bị bệnh ung thư mong để được hưởng tài sản , nhưng rồi cậu nhận ra nhiều điều thiêng liêng còn giá trị hơn tài sản gấp nhiều lần . ", img: "https://assets.glxplay.io/images/w1600/title/gia-tai-cua-ngoai_web_spotlight_a1bfab35380ebb9bac36f26d63023086.jpg" },
        { id: 2, title: " Bà Dương và ông Thoại luôn cố xây dựng hình ảnh gia đình tài giỏi và danh giá trong mắt mọi người. Nhưng dưới lớp vỏ bọc hào nhoáng ấy là những biến cố và “khuyết điểm” đầy bất ngờ.", img: "https://assets.glxplay.io/images/w1600/title/cai-gia-cua-hanh-phuc_web_spotlight_e6c74ae5f6b5265a700e39712344cab4.jpg" },
        { id: 3, title: "Vì muốn tóm được trùm xã hội đen Chu Lâm Phương, bộ đôi oan gia gồm thanh tra Cho Su Gwang và kẻ lừa đảo Kim In Hae phải bất đắc dĩ hợp tác với nhau, từ đó gây ra đủ chuyện dở khóc dở cười .", img: "https://assets.glxplay.io/images/w1600/title/anh-trai-vuot-moi-tam-tai_web_spotlight_0761683531926e313e38298c6e927968.jpg" },
        { id: 4, title: "Trái tim đầy sẹo của Mai bỗng như được chữa lành và khao khát được sống khác đi khi Dương tiến vào cuộc đời cô. Nhưng tình yêu của họ vẫn sẽ vẹn nguyên khi miệng đời lắm cay nghiệt, bất công?", img: "https://assets.glxplay.io/images/w1600/title/mai_web_spotlight_fb2956a6cb654bad152150758fe78326.jpg" },
    ];

    // Custom arrow component
    const CustomPrevArrow = ({ onClick }) => (
        <div
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full"
            onClick={onClick}
        >
            <AiOutlineLeft size={24} />
        </div>
    );

    const CustomNextArrow = ({ onClick }) => (
        <div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer text-white bg-black bg-opacity-50 p-2 rounded-full"
            onClick={onClick}
        >
            <AiOutlineRight size={24} />
        </div>
    );

    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1, // Hiển thị 1 slide mỗi lần
        slidesToScroll: 1, // Trượt 1 slide mỗi lần
        autoplay: true, // Tự động chuyển slide
        autoplaySpeed: 2000,
        prevArrow: <CustomPrevArrow />, // Nút mũi tên trái
        nextArrow: <CustomNextArrow />, // Nút mũi tên phải
    };

    return (
        <div className="rented-movies-page relative bg-black">
            <Slider className='bg-black' {...settings}>
                {moviess.map((movie) => (
                    <div key={movie.id} className="relative h-screen">
                        {/* Hình ảnh chiếm toàn bộ chiều cao màn hình */}
                            <img
                                src={movie.img}
                                alt=""
                                className="w-full h-full object-cover"
                            />
                  
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center px-4">
                            {/* Nút hành động */}
                            <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                                <Button
                                    variant="contained"
                                    startIcon={<CiPlay1 size={20} />}
                                    sx={{
                                        textTransform: "none",
                                        padding: "8px 16px",
                                        fontSize: "14px", // Font nhỏ hơn trên thiết bị nhỏ
                                        fontWeight: "bold",
                                        backgroundColor: "white",
                                        color: "black",
                                    }}
                                >
                                    Thuê Phim 59.000đ
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<TfiVideoClapper size={20} />}
                                    sx={{
                                        textTransform: "none",
                                        padding: "8px 16px",
                                        fontSize: "14px",
                                        fontWeight: "bold",
                                        backgroundColor: "gray",
                                        color: "white",
                                    }}
                                >
                                    Xem Trailer
                                </Button>
                            </div>
                            {/* Tiêu đề phim */}
                            <div className="w-full mt-3 text-sm sm:text-lg md:text-xl lg:text-2xl text-white font-bold">
                                <h1>{movie.title}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </Slider>
            <SlideEmotional data={moviesVipSSS} title="Phim Hành Động , Bom Tấn" />
            <Slideshow data={moviesRents} title="Phim Hot Trong Tuần" />
            <Slideshow data={moviesGiadinh} title="Phim Hoạt Hình Gia Đình" />
        </div>
    );
};


export default Rentedmovies;

