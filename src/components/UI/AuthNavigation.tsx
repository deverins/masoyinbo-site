// src/app/(default)/AuthNavigation.tsx
"use client";
import React from 'react';
import { useAuth } from '@/hooks/AuthContext'; 
import AdminNav from '@/components/AdminNav';
import Navbar from '@/components/Navbar';

const AuthNav: React.FC = () => {
  const { isLoggedIn, userRole } = useAuth(); 

  return (
    <>
      {isLoggedIn && userRole === 'admin' ? <AdminNav /> : <Navbar />}
    </>
  );
};

export default AuthNav;
