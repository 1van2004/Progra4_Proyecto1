
import { createContext, useEffect, useState } from "react";
import { login as apiLogin, decodeToken } from "../Services/AuthService";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      if (token) {
        const decoded = decodeToken(token);
        setUser(decoded);
      }
    } catch (error) {
      console.error("Error al leer token del localStorage:", error);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
  }, []);

  const login = async (email, password) => {
    setLoginLoading(true);
    setLoginError(false);
    try {
      const token = await apiLogin({ email, password });
      localStorage.setItem("token", token);
      const decodedUser = decodeToken(token);
      localStorage.setItem("user", JSON.stringify(decodedUser));
      setUser(decodedUser);
    } catch (error) {
      console.error("Error en login:", error);
      setLoginError(true);
      throw error;
    } finally {
      setLoginLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loginLoading, loginError }}>
      {children}
    </AuthContext.Provider>
  );
}
