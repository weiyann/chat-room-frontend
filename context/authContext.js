import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({});
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});

  useEffect(() => {
    // 從localStorage中讀取驗證信息
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setAuth(authData);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
