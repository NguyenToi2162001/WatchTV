import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextPeatures = createContext();

export const PeaturesProvider = ({ children }) => {
  const [peatures, setPeatures] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Peatures", (peatureList) => {
      setPeatures(peatureList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextPeatures.Provider value={peatures}>
      {children}
    </ContextPeatures.Provider>
  );
};