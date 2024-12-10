import React, { createContext, useState, useContext, useEffect } from 'react';
// Tạo Context để quản lý thông tin người dùng
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Component cung cấp thông tin người dùng
export const AuthsProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Trạng thái người dùng

    const login = (userData) => {
        setUser(userData); // Lưu thông tin người dùng sau khi đăng nhập thành công
        localStorage.setItem('user', JSON.stringify(userData)); // Lưu vào localStorage
    };
    
    const logout = () => {
        setUser(null); // Đăng xuất
        localStorage.removeItem('user');
    };
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser)); // Khôi phục thông tin user
        }
      }, []);
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
