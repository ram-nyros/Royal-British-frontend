import { createContext, useContext } from "react";

// Legacy context kept for minimal impact; now proxies to Redux state via custom hook if needed.
const AuthContext = createContext({ user: null });

export const AuthProvider = ({ children }) => {
  return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
