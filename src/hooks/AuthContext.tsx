"use client";
import Loading from '@/components/UI/Loading';
import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  isLoggedIn: boolean | null;
  userRole: string | null;
  login: (user: any) => void;
  logout: () => void;
  withAdminAuth: (WrappedComponent: React.FC) => React.FC;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);
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
      const { isLoggedIn, userRole } = useAuth();
      const [loading, setLoading] = useState(true);
      const router = useRouter();

      useEffect(() => {
        if (isLoggedIn === null || userRole === null) {
          setLoading(false);
          // setLoading(true);
        } else {
          setLoading(false);

          if (!isLoggedIn || userRole !== 'admin') {
            router.push('/admin/login');
          }
        }
      }, [isLoggedIn, userRole, router]);

      // While loading, display the loading spinner
      if (loading) {
        return (
          <div className="min-h-screen flex justify-center">
            <Loading />
          </div>
        );
      }

      // Only render the protected component if the user is logged in and is an admin
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
