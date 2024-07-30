// src/auth/index.tsx

import React, { useCallback, useContext, useEffect, useState } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
}

const AuthContext = React.createContext<IAuthContext | null>(null);
const key = "tcg-auth";

const getLocalData = () => {
  return localStorage.getItem(key) || null;
};

const setStoredUser = (user: string | null) => {
  if (user) {
    localStorage.setItem(key, user);
  } else {
    localStorage.removeItem(key);
  }
};

export const AuthProviderContext = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<string | null>(getLocalData());
  const isAuthenticated = !!user;

  const logout = useCallback(async () => {
    setStoredUser(null);
    setUser(null);
  }, []);

  const login = useCallback(async (username: string) => {
    setStoredUser(username);
    setUser(username);
  }, []);

  useEffect(() => {
    setUser(getLocalData());
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
