import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);       // user info from JWT
  const [loading, setLoading] = useState(true); // loading state during refresh

  // Restore user from token on page refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        console.log("Decoded JWT:", decodedUser);
        // Optional: check token expiry
        const now = Date.now() / 1000; // current time in seconds
        if (decodedUser.exp && decodedUser.exp < now) {
          // Token expired
          localStorage.removeItem("token");
          setUser(null);
        } else {
          setUser(decodedUser);
        }
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (user) {
      console.log("User logged in");
      console.log("Name:", user.username);
      console.log("Role:", user.role);
    }
  }, [user]);

  // Call this after successful login
  const login = (token) => {
    localStorage.setItem("token", token);
    try {
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Invalid token on login:", error);
      localStorage.removeItem("token");
      setUser(null);
    }
  };

  // Call this on logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
        {children}
    </AuthContext.Provider>
  );
};

export { AuthContext };
export default AuthProvider;

