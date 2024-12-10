import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextTrailers = createContext();

export const TrailerProvider = ({ children }) => {
  const [trailer, setTrailer] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Trailers", (trailersList) => {
      setTrailer(trailersList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextTrailers.Provider value={trailer}>
      {children}
    </ContextTrailers.Provider>
  );
};