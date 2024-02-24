import React, { useState, createContext, useEffect } from "react";

export const AuthContext = createContext({});
export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [imageChosen, setImageChosen] = useState({
    id: 1,
    src: "/image/user-01.png",
  });

  //  登出的函式
  const logout = () => {
    localStorage.removeItem("auth");

    setAuth({});
    setImageChosen({ id: 1, src: "/image/user-01.png" });
  };

  useEffect(() => {
    // 從localStorage中讀取驗證信息
    const authData = JSON.parse(localStorage.getItem("auth"));
    if (authData) {
      setAuth(authData);
      setImageChosen(authData.imageChosen);
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      localStorage.setItem("auth", JSON.stringify({ ...auth, imageChosen }));
    }
  }, [imageChosen]);

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, imageChosen, setImageChosen, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
