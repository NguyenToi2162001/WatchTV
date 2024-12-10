import React from 'react';
import { IoMdMail } from "react-icons/io";
import { FaPhoneAlt } from "react-icons/fa";

function Support(props) {
    return (
        <div className='bg-slate-200 '>
            <div class="relative">
                <img src="https://cdn.pixabay.com/photo/2016/06/20/13/44/paper-1468883_640.jpg" alt="" class="w-full h-96" />
                <div class="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
                    <p class="text-2xl font-bold sm:text-2xl">Khách Hàng Cần Chúng Tôi Hỗ Trợ</p>
                    <p class="text-xl font-bold mt-2 sm:text-lg">Hỗ trợ giải đáp các vấn đề trong quá trình sử dụng Dịch vụ Watch TV.</p>
                    <div class="flex flex-col gap-4 mt-4 sm:flex-row sm:gap-2">
                        <div class="flex items-center">
                            <IoMdMail size={23} />
                            <p class="text-xl font-bold ms-2 sm:text-base">Email: play@WatchTV.com.vn</p>
                        </div>
                        <div class="flex items-center sm:ms-4">
                            <FaPhoneAlt size={20} />
                            <p class="text-xl font-bold ms-2 sm:text-base">Hotline: 0973744974</p>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className='text-center text-3xl font-bold py-3'>Các câu hỏi thường gặp </h1>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-11/12 m-auto py-10 ">
                <div class="bg-white p-4">
                    <p className='font-bold text-lg '>PHƯƠNG THỨC THANH TOÁN</p>
                    <hr className='mt-2' />
                    <p className='mt-2 text-lg hover:text-gray-500'>Watch TV có dịch vụ thanh toán qua thẻ cào không?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>TrênWatch TV hiện nay có những phương thức thanh toán nào đang áp dụng?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Khi đã đăng ký gói F10 (MobiFone), tôi có bị trừ cước khi xem Watch TV bằng 3G/4G không?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Gói F10 có tự động gia hạn hay không?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Tôi không muốn sử dụng gói F10 nữa thì hủy như thế nào?</p>
                    <p className='text-blue-600 text-lg font-bold mt-2'>Xem thêm</p>
                </div>
                <div class="bg-white p-4">
                    <p className='font-bold text-lg '>THÔNG TIN WATCHTV</p>
                    <hr className='mt-2' />
                    <p className='mt-2 text-lg hover:text-gray-500'>Watch TV là gì?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Watch TV có những danh mục sản phẩm nào?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Watch TV có thể xem trên thiết bị nào?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Phim Thuê là gì?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Phim Theo Gói là gì?</p>
                    <p className='text-blue-600 text-lg font-bold items-end'>Xem thêm</p>
                </div>
                <div class="bg-white p-4">
                    <p className='font-bold text-lg '>CÂU HỎI THƯỜNG GẶP</p>
                    <hr className='mt-2' />
                    <p className='mt-2 text-lg hover:text-gray-500'>Tài khoản Watch TV có thể đăng nhập và xem được bao nhiêu thiết bị?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Có bị giới hạn số lượng phim tải về hay không?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Sau khi thuê phim trong mục Phim Có Phí, tôi có thể tải phim về được không? Và tôi có được thông báo khi mục đã tải sắp hết hạn hay không?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Làm thế nào để hủy tài khoản?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Tôi có thể xem các phim đã tải về dù đã hủy gia hạn Thuê Bao Tháng hay không?</p>
                    <p className='text-blue-600 text-lg font-bold mt-2'>Xem thêm</p>
                </div>
                <div class="bg-white p-4">
                    <p className='font-bold text-lg '>GÓI DỊCH VỤ</p>
                    <hr className='mt-2' />
                    <p className='mt-2 text-lg hover:text-gray-500'>Gói FIM30 là gì?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Tôi có thể đăng ký gói FIM30 như thế nào?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Gói FIM30 có thể sử dụng kèm theo các gói data khác của MobiFone hay không?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Tôi đã đăng ký gói FIM30, tài khoản của tôi có thể được dùng trên các thiết bị khác không?</p>
                    <p className='mt-2 text-lg hover:text-gray-500'>Gói FIM2 là gì?</p>
                    <p className='text-blue-600 text-lg font-bold mt-2'>Xem thêm</p>
                </div>
            </div>


        </div>

    );
}

export default Support;