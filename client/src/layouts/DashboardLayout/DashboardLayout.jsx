import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';

const DashboardLayout = () => {
  const { token, loading } = useAuth();

  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>;
  if (!token) return <Navigate to="/login" replace />;

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans">
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <main className="flex-1 ml-64 min-h-[calc(100vh-4rem)] bg-gray-950 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
