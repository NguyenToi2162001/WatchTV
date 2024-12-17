import React from 'react';

function SlideMain(props) {
    return (
        <div className='flex flex-col md:flex-row justify-around bg-black text-white pt-5'>
            <div className='p-6 md:p-8 '>
                <p className='text-2xl md:text-5xl hover:text-orange-200'>
                    Giải trí online không giới hạn hàng nghìn giờ nội dung đậm chất Việt
                </p>
                <p className='text-sm md:text-xl mt-4 md:mt-8 hover:text-orange-200'>Bom tấn Việt chiếu rạp độc quyền và sớm nhất</p>
                <p className='text-sm md:text-xl mt-2 hover:text-orange-200'>Thư viện phim Việt lớn nhất Việt Nam</p>
                <p className='text-sm md:text-xl mt-2 hover:text-orange-200'>Phim Bộ độc quyền WatchTV</p>
                <p className='text-sm md:text-xl mt-2 hover:text-orange-200'>Phim Bộ Hot Châu Á</p>
                <p className='text-sm md:text-xl mt-2 hover:text-orange-200'>Siêu phẩm điện ảnh Hollywood và Disney</p>
                <button className='bg-amber-400 px-4 py-2 mt-4 md:mt-3 rounded-md text-white font-bold hover:bg-amber-800 text-xs md:text-sm'>
                    ĐĂNG KÝ GÓI
                </button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4 md:p-7">
                <div className="overflow-hidden">
                    <img
                        src="https://assets.glxplay.io/web/responsive/w300/Eve_1000x1500.jpg"
                        alt="Image 1"
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                </div>
                <div className="overflow-hidden">
                    <img
                        src="https://assets.glxplay.io/web/responsive/w300/ChiMeHocYeu2_1000x1500.jpg"
                        alt="Image 2"
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                </div>
                <div className="overflow-hidden">
                    <img
                        src="https://assets.glxplay.io/web/responsive/w300/DoctorStrangeInTheMultiverseOfMadness_1000x1500.jpg"
                        alt="Image 3"
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                </div>
                <div className="overflow-hidden">
                    <img
                        src="https://assets.glxplay.io/web/responsive/w300/Cinderella2021_1000x1500.jpg"
                        alt="Image 4"
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                </div>
                <div className="overflow-hidden">
                    <img
                        src="https://assets.glxplay.io/web/responsive/w300/ChiaKhoaTramTy_1000x1500.jpg"
                        alt="Image 5"
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                </div>
                <div className="overflow-hidden">
                    <img
                        src="https://assets.glxplay.io/web/responsive/w300/MyHeroAcademiaWorldHeroesMission_1000x1500.jpg"
                        alt="Image 6"
                        className="rounded-lg shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-110"
                    />
                </div>
            </div>
        </div>
    );
}

export default SlideMain;