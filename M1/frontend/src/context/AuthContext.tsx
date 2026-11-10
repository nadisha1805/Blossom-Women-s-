import { createContext, useContext, useState } from 'react';

export type UserRole =
  | 'SUPER_ADMIN'
  | 'CLINIC_ADMIN'
  | 'DOCTOR'
  | 'NURSE'
  | 'RECEPTIONIST'
  | 'LAB_STAFF'
  | 'BILLING_STAFF';

export interface AuthUser {
  id: string;
  email: string;
  fullName: string;
  role: UserRole;
  doctorId?: string | null;
  doctorName?: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  token: string | null;
  login: (token: string, user: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (...roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('blossom_token'));
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem('blossom_user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = (newToken: string, newUser: AuthUser) => {
    localStorage.setItem('blossom_token', newToken);
    localStorage.setItem('blossom_user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem('blossom_token');
    localStorage.removeItem('blossom_user');
    setToken(null);
    setUser(null);
  };

  const hasRole = (...roles: UserRole[]): boolean => {
    if (!user) return false;
    if (user.role === 'SUPER_ADMIN') return true;
    return roles.includes(user.role);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!token && !!user,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
