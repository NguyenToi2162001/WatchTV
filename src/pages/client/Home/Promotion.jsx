import React from 'react';

function Promotion(props) {
    return (
        <div>
            <img src="https://assets.glxplay.io/web/images/Brand_GCxGP_2048x682.max-1920x668.png" alt="" />
            <div className='p-8'>
                <h1 className='font-bold text-2xl'>Sự Kiện Nổi Bật</h1>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
                    <div>
                        <img src="https://assets.glxplay.io/web/images/MAI_700x425.2e16d0ba.fill-700x425.png" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>WatchTV khuấy động mùa hè với hàng loạt phim điện ảnh hấp dẫn 2024</h1>
                    </div>
                    <div>
                        <img src="https://assets.glxplay.io/web/images/PNS_ACB_TrangKM_700x425.2e16d0ba.fill-700x425.jpg" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>Xem phim miễn phí khi tạo tài khoản ngân hàng ACB</h1>
                    </div>
                    <div>
                        <img src="https://assets.glxplay.io/web/images/700x425_bUCg4ds.2e16d0ba.fill-700x425.jpg" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>SIÊU VŨ TRỤ DATA - GIẢI TRÍ MAX ĐÃ</h1>
                    </div>
                    <div>
                        <img src="https://assets.glxplay.io/web/images/BD_Casper_TrangKM_700x425.2e16d0ba.fill-700x425.jpg" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>TRẢI NGHIỆM VŨ TRỤ GIẢI TRÍ BẤT TẬN CÙNG GALAXY PLAY TRÊN SMART TV CASPER </h1>
                    </div>
                    <div>
                        <img src="https://assets.glxplay.io/web/images/Brand_GPxGC_Opt5.2e16d0ba.fill-700x425.png" alt="Image 1" class="w-full h-auto" />
                        <h1 className='font-bold mt-2'>Sự kết hợp hoàn hảo, vũ trụ giải trí Galaxy không giới hạn </h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Promotion;