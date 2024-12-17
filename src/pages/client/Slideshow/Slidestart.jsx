import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y ,Autoplay } from "swiper/modules";
function Slidestart(props) {
    return (
        <div>
            <Swiper
                className="relative z-10"
                modules={[Navigation, Pagination, Scrollbar, A11y ,Autoplay]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                autoplay={{
                    delay: 4000, // Thời gian chuyển slide tự động, 3000ms = 3 giây
                    disableOnInteraction: false, // Nếu người dùng tương tác, autoplay sẽ không dừng lại
                }}
            >
                <SwiperSlide>
                    <div className="relative bg-lightblue h-screen">
                        <img
                            src="https://assets.glxplay.io/web/images/VenomTheLastDance_1920x1080_S.max-1920x1080.jpg"
                            alt="Venom"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1/3 left-1/4 flex flex-col items-center justify-center text-white">
                            <h1 className="text-6xl font-bold text-center mb-4 hover:text-orange-100 animate__animated animate__fadeInLeftBig">
                                Venom <br /> Kèo Cuối
                            </h1>
                            <button className="px-6 py-2 bg-stone-600 rounded hover:bg-slate-700 transition">
                                Đăng Kí
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative bg-lightblue h-screen">
                        <img
                            src="https://assets.glxplay.io/web/images/FaceMe_1920x1080_S.max-1920x1080.jpg"
                            alt="Venom"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1/3 left-1/4 flex flex-col items-center justify-center text-white">
                            <h1 className="text-6xl font-bold text-center mb-4 hover:text-orange-100">
                                FACE ME<br /> ĐỐI MẶT
                            </h1>
                            <button className="px-6 py-2 bg-stone-600 rounded hover:bg-slate-700 transition">
                                Đăng Kí
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="relative bg-lightblue h-screen">
                        <img
                            src="https://assets.glxplay.io/web/images/PeeNak4_1920x1080_S.max-1920x1080.jpg"
                            alt="Venom"
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute top-1/3 left-1/4 flex flex-col items-center justify-center text-white">
                            <h1 className="text-5xl font-bold text-center mb-4 hover:text-orange-100">
                                PEENAK4<br /> NGÔI ĐỀN KỲ QUÁI
                            </h1>
                            <button className="px-6 py-2 bg-stone-600 rounded hover:bg-slate-700 transition">
                                Đăng Kí
                            </button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>



        </div>
    );
}

export default Slidestart;