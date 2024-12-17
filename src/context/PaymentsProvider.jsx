import React, { createContext, useState, useContext } from 'react';

// Tạo context cho PaymentsProvider
const PaymentsContext = createContext();

// PaymentsProvider component
export const PaymentsProvider = ({ children }) => {
    const [clickedPlanID, setClickedPlanID] = useState(null);

    return (
        <PaymentsContext.Provider value={{ clickedPlanID, setClickedPlanID }}>
            {children}
        </PaymentsContext.Provider>
    );
};

// Hook sử dụng context Payments
export const usePayment = () => {
    return useContext(PaymentsContext);
};
