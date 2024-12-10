import React from 'react';

function Blog(props) {
    return (
        <div>
            <img src="https://assets.glxplay.io/web/images/Camp_MuaGCCTangMai_TrangKM_1920x668.max-1920x668.jpg" alt="" />
            <div className='p-8'>
                <h1 className='font-bold text-2xl'>Sự Kiện Nổi Bật</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    <div>
                        <img src="https://assets.glxplay.io/web/images/GLCB_700x425.2e16d0ba.fill-700x425.png" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>Gặp Lại Chị Bầu - Chuyến phiêu lưu về quá khứ </h1>
                    </div>
                    <div>
                        <img src="https://assets.glxplay.io/web/images/review-phim-mai.2e16d0ba.fill-700x425.jpg" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>Xem phim Mai Full HD + Thuyết Minh [2024] </h1>
                    </div>
                    <div>
                        <img src="https://assets.glxplay.io/web/images/phim-tran-thanh.2e16d0ba.fill-700x425.jpg" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>Top 11 bộ phim điện ảnh và truyền hình của Trấn Thành đặc sắc nhất 2024 </h1>
                    </div>
                    <div>
                        <img src="https://assets.glxplay.io/web/images/review-phim-mai.2e16d0ba.fill-700x425.jpg" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>Review phim Mai: Bộ phim "chữa rách' tâm hồn đã lành </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Blog;