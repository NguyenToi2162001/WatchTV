import React from 'react';
import { FaRegCreditCard } from "react-icons/fa";
import { FcSimCardChip } from "react-icons/fc";
import { PiDeviceMobileFill } from "react-icons/pi";
import { CiShoppingCart } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { FaCcPaypal } from "react-icons/fa6";
import { usePayment } from '../../../context/PaymentsProvider';
function Payment(props) {
    return (
        <div className='bg-slate-200'>
            <div class="grid grid-cols-1 lg:grid-cols-2">
                <div class="bg-gray-200 p-4 grid grid-rows-2 gap-2 ">
                    <div class="bg-white rounded-xl p-7">
                        <p className='font-bold ps-3'>Chọn Gói Đăng Ký</p>
                        <hr className='mt-3' />
                        <div className='flex justify-between px-3 mt-3'>
                            <div className='flex'>
                                <input type="checkbox" name="" id="" />
                                <div className='ms-2'>
                                    <p className='font-bold'>1 Tháng</p>
                                    <p className='text-red-600 font-bold'>Giảm 10%</p>
                                </div>
                            </div>
                            <div>
                                <p className='font-bold'>180.000 VNĐ</p>
                                <span class="line-through">200.000 VNĐ</span>
                            </div>
                        </div>
                        <div className='flex justify-between px-3 mt-3'>
                            <div className='flex'>
                                <input type="checkbox" name="" id="" />
                                <div className='ms-2'>
                                    <p className='font-bold'>6 Tháng</p>
                                    <p className='text-red-600 font-bold'>Giảm 15%</p>
                                </div>
                            </div>
                            <div>
                                <p className='font-bold'>1.020.000 VNĐ</p>
                                <span class="line-through">1.200.000 VNĐ</span>
                            </div>
                        </div>
                        <div className='flex justify-between px-3 mt-3'>
                            <div className='flex'>
                                <input type="checkbox" name="" id="" />
                                <div className='ms-2'>
                                    <p className='font-bold'>12 Tháng</p>
                                    <p className='text-red-600 font-bold'>Giảm 10%</p>
                                </div>
                            </div>
                            <div>
                                <p className='font-bold'>1.680.000 VNĐ</p>
                                <span class="line-through">1.800.000 VNĐ</span>
                            </div>
                        </div>
                    </div>
                    <div class="bg-white rounded-xl p-7">
                        <p className='font-bold ps-3'>THÔNG TIN THANH TOÁN</p>
                        <hr className='mt-3' />
                        <div className='p-3'>
                            <div className='mt-2'>
                                <span class="font-bold">Tài Khoản:</span> Laimanh@gmail.com
                            </div>
                            <div className='mt-2'>
                                <span class="font-bold">Tên Gói:</span> Siêu Việt
                            </div>
                            <div className='mt-2'>
                                <span class="font-bold">Ngày Hiệu Lực:</span> 12/12/2024
                            </div>
                            <div className='mt-2'>
                                <span class="font-bold">Ngày Hết Hạn:</span> 12/1/2025
                            </div>
                            <div className='flex mt-2'>
                                <span class="font-bold">Khuyến Mãi:</span>
                                <p className='font-bold text-red-600 ms-1'> 10%</p>
                            </div>
                        </div>
                        <hr />
                        <div className='flex mt-2 p-3'>
                            <span class="font-bold">Tổng Cộng:</span>
                            <p className='font-bold text-red-600 ms-1'> 1.800.000 VNĐ</p>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-200 p-4 ">
                    <div class="bg-white rounded-xl p-7">
                        <p className='font-bold'>Phương Thức Thanh Toán</p>
                        <hr className='mt-3' />
                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-4 p-3 '>
                            <div className='flex items-center justify-center border-2 rounded-lg p-3'>
                                <FaRegCreditCard />
                                <p className='ms-2'>Thẻ Tín Dụng</p>
                            </div>
                            <div className='flex items-center justify-center border-2 rounded-lg p-3'>
                                <FcSimCardChip />
                                <p className='ms-2'> Thẻ ATM </p>
                            </div>
                            <div className='flex items-center justify-center border-2 rounded-lg p-3'>
                                <PiDeviceMobileFill />

                                <p className='ms-2'> Ví MoMo  </p>
                            </div>
                            <div className='flex items-center justify-center border-2 rounded-lg p-3'>
                                <PiDeviceMobileFill />
                                <p className='ms-2'> Ví ZaloPay </p>
                            </div>
                            <div className='flex items-center justify-center border-2 rounded-lg p-3'>
                                <CiShoppingCart />
                                <p className='ms-2'> Ví ShopeePay </p>
                            </div>
                            <div className='flex items-center justify-center border-2 rounded-lg p-3'>
                                <GiMoneyStack />
                                <p className='ms-2'> VNPAY </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div >
    );
}

export default Payment;