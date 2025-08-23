// AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

// Mock user
const ADMIN_EMAIL = 'admin@canteen.com';
const ADMIN_PASS = '1234';

const AuthContext = createContext({
  user: null, // { name: string, email: string } | null
  login: async () => false,
  socialLogin: async () => false,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setUser({ name: 'Admin', email }); // <-- add name here
      return true;
    }
    return false;
  };

  const socialLogin = async (provider) => {
    // Simulate a successful login
    setUser({ name: 'Admin', email: ADMIN_EMAIL }); // <-- add name here
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, socialLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
