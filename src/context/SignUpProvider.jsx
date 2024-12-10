import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextSignUps = createContext();

export const SignUpsProvider = ({ children }) => {
  const [accounts, setAccount] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Accounts", (signupsList) => {
      setAccount(signupsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextSignUps.Provider value={accounts}>
      {children}
    </ContextSignUps.Provider>
  );
};