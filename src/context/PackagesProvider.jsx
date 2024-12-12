import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextPackages = createContext();

export const PackagesProvider = ({ children }) => {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Packages", (packageList) => {
      setPackages(packageList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPackages.Provider value={packages}>
      {children}
    </ContextPackages.Provider>
  );
};