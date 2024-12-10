import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextEpisodes = createContext();

export const EpisodesProvider = ({ children }) => {
  const [episodes, setEpisodes] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Episodes", (episodeList) => {
      setEpisodes(episodeList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextEpisodes.Provider value={episodes}>
      {children}
    </ContextEpisodes.Provider>
  );
};