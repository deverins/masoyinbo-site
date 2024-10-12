// src/hooks/AuthContext.tsx
"use client"
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userRole: string | null;
  login: (user: any) => void;
  logout: () => void;
  withAdminAuth: (WrappedComponent: React.FC) => React.FC;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    const storedUserRole = localStorage.getItem("userRole");

    setIsLoggedIn(storedIsLoggedIn);
    setUserRole(storedUserRole);
  }, []);

  const login = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("userRole", user.role);
    localStorage.setItem("isLoggedIn", "true");
    setIsLoggedIn(true);
    setUserRole(user.role);
  };

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserRole(null);
  };

  const withAdminAuth = (WrappedComponent: React.FC) => {
    const AdminProtectedRoute: React.FC = (props) => {
      useEffect(() => {
        if (!isLoggedIn || userRole !== 'admin') {
          router.push('/admin/login');
        }
      }, []);

      if (!isLoggedIn || userRole !== 'admin') {
        return null;
      }

      return <WrappedComponent {...props} />;
    };

    return AdminProtectedRoute;
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userRole, login, logout, withAdminAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
