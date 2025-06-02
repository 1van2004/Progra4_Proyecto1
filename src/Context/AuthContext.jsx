import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  // Al montar, revisamos si ya hay un usuario en localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser); // ✅ asegurarse que es JSON
        setUser(parsedUser);
      }
    } catch (error) {
      console.error("Error al leer usuario del localStorage:", error);
      localStorage.removeItem("user"); // prevenir que se vuelva a intentar con mal valor
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // ✅ guardar como string válido
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
