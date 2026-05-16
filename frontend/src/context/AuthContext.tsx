import { createContext, useContext, useMemo, useState } from 'react';
import * as api from '../lib/api';

type User = {
  id: number;
  username: string;
  email: string;
};

type AuthContextValue = {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const STORAGE_KEY = 'bookly-auth';

const readInitialAuth = (): { user: User | null; token: string | null } => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : { user: null, token: null };
  } catch {
    return { user: null, token: null };
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const initialAuth = readInitialAuth();
  const [user, setUser] = useState<User | null>(initialAuth.user);
  const [token, setToken] = useState<string | null>(initialAuth.token);

  const commit = (nextUser: User | null, nextToken: string | null) => {
    setUser(nextUser);
    setToken(nextToken);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user: nextUser, token: nextToken }));
  };

  const login = async (identifier: string, password: string) => {
    const response = await api.login(identifier, password);
    commit(response.user, response.jwt);
  };

  const register = async (username: string, email: string, password: string) => {
    const response = await api.register(username, email, password);
    commit(response.user, response.jwt);
  };

  const logout = () => {
    commit(null, null);
  };

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: Boolean(token),
      login,
      register,
      logout,
    }),
    [user, token],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
}
