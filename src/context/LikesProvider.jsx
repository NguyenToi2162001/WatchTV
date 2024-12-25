import React, { createContext, useState, useEffect } from "react";
import { fetchDocumentsRealtime } from "../services/FirebaseService";

export const ContextLikes = createContext();

export const LikesProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    // Sử dụng fetchDocumentsRealtime để lắng nghe dữ liệu realtime
    const unsubscribe = fetchDocumentsRealtime("Likes", (likesList) => {
      setLikes(likesList);
    });

    // Hủy lắng nghe khi component bị unmount
    return () => unsubscribe();
  }, []);

  return (
    <ContextLikes.Provider value={likes}>
      {children}
    </ContextLikes.Provider>
  );
};