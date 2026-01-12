import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        try {
          const me = await api.auth.me();
          setUser(me);
        } catch (e) {
          api.auth.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };
    init();
  }, []);

  const logout = () => {
    api.auth.logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
