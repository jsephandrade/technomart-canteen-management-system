
import React, { createContext, useContext, useState, ReactNode } from "react";

// Mock user
const ADMIN_EMAIL = "admin@canteen.com";
const ADMIN_PASS = "1234";

type AuthContextType = {
  user: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  socialLogin: (provider: string) => Promise<boolean>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  socialLogin: async () => false,
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      setUser(email);
      return true;
    }
    return false;
  };

  const socialLogin = async (provider: string) => {
    // Simulate a successful login
    setUser(ADMIN_EMAIL);
    return true;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, socialLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
