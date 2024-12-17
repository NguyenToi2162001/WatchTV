import React, { createContext, useContext } from 'react';

// Tạo context cho thanh toán
const PaymentContext = createContext();

export const PaymentsProvider = ({ children, value }) => {
    // Kiểm tra xem giá trị có được cung cấp không, nếu không sẽ sử dụng giá trị mặc định
    return <PaymentContext.Provider value={value || {}}>{children}</PaymentContext.Provider>;
};

export const usePayment = () => useContext(PaymentContext);
