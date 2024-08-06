import React, { useCallback, useContext, useEffect, useState } from "react";

export interface IAuthContext {
  isAuthenticated: boolean;
  login: (username: string, id: string) => Promise<void>;
  logout: () => Promise<void>;
  user: string | null;
  id: string | null;
}

const AuthContext = React.createContext<IAuthContext | null>(null);
const token = "tcg-auth";
const userId = "tcg-userid";

const getLocalData = (key: string) => {
  return localStorage.getItem(key) || null;
};

const setStoredUser = (user: string | null, key: string) => {
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
  const [user, setUser] = useState<string | null>(getLocalData(token));
  const [id, setId] = useState<string | null>(getLocalData(userId));
  const isAuthenticated = !!user;

  const logout = useCallback(async () => {
    setStoredUser(null, token);
    setStoredUser(null, userId);
    setUser(null);
    setId(null);
  }, []);

  const login = useCallback(async (username: string, id: string) => {
    setStoredUser(username, token);
    setStoredUser(id, userId);
    setUser(username);
    setId(id);
  }, []);

  useEffect(() => {
    setUser(getLocalData(token));
    setId(getLocalData(userId));
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, id }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
