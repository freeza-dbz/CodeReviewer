import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import DashboardLayout from '../layouts/DashboardLayout/DashboardLayout';

// Mock imports for pages (will create these next)
const Login = React.lazy(() => import('../pages/Login/Login'));
const Signup = React.lazy(() => import('../pages/Signup/Signup'));
const Dashboard = React.lazy(() => import('../pages/Dashboard/Dashboard'));
const Review = React.lazy(() => import('../pages/Review/Review'));
const History = React.lazy(() => import('../pages/History/History'));
const Profile = React.lazy(() => import('../pages/Profile/Profile'));
const Settings = React.lazy(() => import('../pages/Settings/Settings'));
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'));

const AppRoutes = () => {
  return (
    <React.Suspense fallback={<div className="h-screen w-screen flex items-center justify-center bg-gray-900 text-white">Loading...</div>}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/review" element={<Review />} />
          <Route path="/review/:id" element={<Review />} />
          <Route path="/history" element={<History />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </React.Suspense>
  );
};

export default AppRoutes;
