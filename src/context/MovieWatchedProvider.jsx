import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextMovieWatchs = createContext();

export const MovieWatchedProvider = ({ children }) => {
  const [movieWatchs, setMovieWatchs] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("MovieWatchs", (movieWatchsList) => {
      setMovieWatchs(movieWatchsList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextMovieWatchs.Provider value={movieWatchs}>
      {children}
    </ContextMovieWatchs.Provider>
  );
};