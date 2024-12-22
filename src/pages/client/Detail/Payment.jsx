import React, { useContext, useState, useEffect, useRef } from 'react';
import { FaRegCreditCard } from "react-icons/fa";
import { FcSimCardChip } from "react-icons/fc";
import { PiDeviceMobileFill } from "react-icons/pi";
import { CiShoppingCart } from "react-icons/ci";
import { GiMoneyStack } from "react-icons/gi";
import { useParams } from 'react-router-dom';
import { ContextPackages } from '../../../context/PackagesProvider';
import { ContextPlans } from '../../../context/PlansProvider';
import { getAllObjectById, getObjectById } from '../../../services/ResponsitoryService';
import { useAuth } from '../../../context/AuthsProvider'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { initialOptions } from '../../../utils/Constants';
import { addDocument } from '../../../services/FirebaseService';
function Payment(props) {
    const packages = useContext(ContextPackages);
    const plans = useContext(ContextPlans);
    const [paymentMethod, setPaymentMethod] = useState('Credit Card')
    const { id } = useParams();
    const { user } = useAuth();
    const usd = useRef("10");
    const list = getAllObjectById(id, packages);
    const price = getObjectById(id, plans)?.pricePerMonth;
    const sortedList = list.sort((a, b) => a.time - b.time);
    const [isChooose, setIschoose] = useState(sortedList.length > 0 ? sortedList[0] : null);
    const isChooseUseRef = useRef(sortedList[0]);
    const exchangeRate = 24000;
    const priceByMonth = (element) => {
        const priceInVND = (price * element?.time) / 100 * (100 - element?.discount);
        return priceInVND; // Đổi sang USD
    };

    useEffect(() => {
        usd.current = priceByMonth(isChooose);
        isChooseUseRef.current = isChooose;
    }, [isChooose]);

    console.log(isChooose);


    // Function to create a subscription in Firestore
    const createSubscription = async (transactionId) => {
        try {

            const currentPackage = isChooseUseRef.current;
            const price = usd.current / exchangeRate;
            const startDate = new Date();
            const expiryDate = new Date();
            expiryDate.setMonth(startDate.getMonth() + (parseInt(currentPackage.time) || 1));
            const newSup = {
                idUser: user.id,
                plan: id,
                startDate: startDate,
                expiryDate: expiryDate,
                paymentMethod: paymentMethod,
                transactionId: transactionId,
                price: price
            }
            console.log(newSup);

            await addDocument('Subscriptions',newSup);

        } catch (error) {
            console.error('Error creating subscription:', error);
            alert('Failed to create subscription. Please try again.');
        }
    };

    return (
        <div className='bg-slate-200'>
            <div class="grid grid-cols-1 lg:grid-cols-2">
                <div class="bg-gray-200 p-4 grid grid-rows-2 gap-2 ">
                    <div class="bg-white rounded-xl p-7">
                        <p className='font-bold ps-3'>Chọn Gói Đăng Ký</p>
                        <hr className='mt-3' />
                        {list.sort((a, b) => a.time - b.time).map((element, index) => (
                            <div className='flex justify-between px-3 mt-3' key={index}>
                                <div className='flex'>
                                    <input
                                        onClick={() => setIschoose(element)}
                                        type="radio"
                                        name="pakage"
                                        id={`package-${index}`}
                                        checked={isChooose === element} // Đánh dấu nếu là phần tử được chọn
                                    />
                                    <div className='ms-2'>
                                        <p className='font-bold'>{element.time}/tháng</p>
                                        <p className='text-red-600 font-bold'>Giảm {element.discount}%</p>
                                    </div>
                                </div>
                                <div>
                                    <p className='font-bold'>{priceByMonth(element).toLocaleString('vi-VN')} <sup>VNĐ</sup></p>
                                    <span className="line-through">{(price * element.time).toLocaleString('vi-VN')}<sup>VNĐ</sup></span>
                                </div>
                            </div>
                        ))}

                    </div>
                    <div class="bg-white rounded-xl p-7">
                        <p className='font-bold ps-3'>THÔNG TIN THANH TOÁN</p>
                        <hr className='mt-3' />
                        <div className='p-3'>
                            <div className=' flex items-centermt-2'>
                                <span class="font-bold">Tài Khoản: </span>
                                <p className='ms-2 text-amber-400'>{user?.email}</p>
                            </div>
                            <div className='flex items-center mt-2'>
                                <span class="font-bold">Tên Gói:</span>
                                <p className='ms-2 text-lime-500'> {getObjectById(id, plans)?.title}</p>
                            </div>
                            <div className='mt-2'>
                                <span class="font-bold">Ngày Hiệu Lực:</span> 12/12/2024
                            </div>
                            <div className='mt-2'>
                                <span class="font-bold">Ngày Hết Hạn:</span> 12/1/2025
                            </div>
                            <div className='flex mt-2'>
                                <span class="font-bold">Khuyến Mãi:</span>
                                <p className='font-bold text-red-600 ms-1'> {isChooose?.discount}%</p>
                            </div>
                        </div>
                        <hr />
                        <div className='flex mt-2 p-3'>
                            <span class="font-bold">Tổng Cộng:</span>
                            <p className='font-bold text-red-600 ms-1'>{priceByMonth(isChooose).toLocaleString('vi-VN')} <sup>VNĐ</sup></p>
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
                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        <PayPalScriptProvider options={initialOptions}>
                            <PayPalButtons
                                style={{ layout: "vertical" }}
                                createOrder={(data, actions) => {
                                    const price = usd.current / exchangeRate;                                 
                                    return actions.order.create({


                                        purchase_units: [
                                            {
                                                amount: {
                                                    value: price.toFixed(2)  // Không bao gồm ký hiệu tiền tệ
                                                }
                                            }
                                        ]
                                    });
                                }}
                                onApprove={(data, actions) => {
                                    return actions.order.capture().then((details) => {
                                        const transactionId = details.id; // Lấy ID giao dịch từ PayPal
                                        createSubscription(transactionId);
                                    });
                                }}
                                onError={(err) => {
                                    console.error("PayPal error:", err);
                                }}
                            />
                        </PayPalScriptProvider>

                    </div>
                </div>
            </div>

        </div >
    );
}

export default Payment;