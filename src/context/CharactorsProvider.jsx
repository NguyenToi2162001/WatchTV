import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextCharactors = createContext();

export const CharactorsProvider = ({ children }) => {
  const [charactors, setCharactors] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Charactors", (charactorsList) => {
      setCharactors(charactorsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextCharactors.Provider value={charactors}>
      {children}
    </ContextCharactors.Provider>
  );
};