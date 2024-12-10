import React from 'react';
import { FaFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import { SiZalo } from "react-icons/si";
import Logo from '../../../assets/images/rim.png'
function Footer(props) {
    return (
        <div className='bg-black text-white flex flex-col items-center py-8 '>
            <div className='flex justify-center mb-4'>
                <img className='w-16 h-16' src={Logo} alt="" />
            </div>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-6'>
                {/* Thông tin công ty */}
                <div className='font-medium lg:col-span-2'>
                    <p>
                        Galaxy Play là dịch vụ được cung cấp bởi Công ty <br /> Cổ Phần Galaxy Play, thành viên của Công ty Cổ <br /> Phần Giải Trí và Giáo Dục Galaxy (GEE.,JSC)
                    </p>
                    <p className='mt-2'>Địa chỉ: 398/28/11 Hoàng Văn Thái , <br /> Phường Hòa Khánh Nam , Quận Liên Chiểu , <br /> TP Đà Nẵng , Việt Nam.</p>
                    <p className='mt-2'>Mã số doanh nghiệp: 0106539659.</p>
                    <p className='mt-2'>Ngày cấp mã số doanh nghiệp: 15/5/2014.</p>
                    <p className='mt-2'>Nơi cấp: Sở kế hoạch và đầu tư thành phố Hà Nội.</p>
                    <img className='mt-2 w-20 h-20' src="https://assets.glxplay.io/web/responsive/w200/informed.png" alt="" />
                </div>

                {/* Giới thiệu */}
                <div className='lg:col-span-1'>
                    <strong>GIỚI THIỆU</strong>
                    <p className='mt-3 text-gray-400'>Quy chế sử dụng Dịch vụ</p>
                    <p className='mt-3 text-gray-400'>Chính sách bảo mật</p>
                    <p className='mt-3 text-gray-400'>Khuyến mãi</p>
                </div>

                {/* Hỗ trợ */}
                <div className='lg:col-span-1'>
                    <strong>HỖ TRỢ</strong>
                    <p className='mt-3 text-gray-400'>1900 8675 (24/7)</p>
                    <p className='mt-3 text-gray-400'>play@watchTV.com.vn</p>
                    <p className='mt-3 text-gray-400'>https://watchTV.vn/help</p>
                </div>

                {/* Tải ứng dụng */}
                <div className='lg:col-span-2'>
                    <strong>TẢI ỨNG DỤNG</strong>
                    <div className='flex items-center mt-4'>
                        <img className='w-16 h-16' src="https://assets.glxplay.io/web/responsive/w200/android-app-download-button.png" alt="" />
                        <img className='ms-2 w-16 h-16' src="https://assets.glxplay.io/web/responsive/w200/ios-app-download-button.png" alt="" />
                    </div>
                    <p className='mt-4 font-bold'>KẾT NỐI VỚI CHÚNG TÔI</p>
                    <div className='flex items-center mt-4'>
                        <FaFacebook size={40} />
                        <FaSquareInstagram  size={40} className='ms-3'/>
                        <FaYoutube size={40} className='ms-3' />
                        <AiFillTikTok size={40} className='ms-3' />
                        <SiZalo size={40} className='ms-3' />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Footer; 