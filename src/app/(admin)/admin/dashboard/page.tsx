"use client"
import { useAuth } from '@/hooks/AuthContext';
import React from 'react';

const AdminDashboard: React.FC = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      {/* Admin content goes here */}
    </div>
  );
};

export default () => {
  const { withAdminAuth } = useAuth();
  const ProtectedAdminDashboard = withAdminAuth(AdminDashboard);
  return <ProtectedAdminDashboard />;
};
