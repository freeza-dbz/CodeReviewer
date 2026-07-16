import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/authApi';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, verify token with backend here
    if (token) {
      setUser({ id: 'u1', name: 'Test User', email: 'test@example.com', avatar: 'https://i.pravatar.cc/150?u=u1' });
    }
    setLoading(false);
  }, [token]);

  const login = async (credentials) => {
    try {
      const data = await apiLogin(credentials);
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('token', data.token);
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return false;
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
      setToken(null);
      setUser(null);
      localStorage.removeItem('token');
      toast.success('Logged out successfully!');
    } catch (error) {
      toast.error('Logout failed');
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
