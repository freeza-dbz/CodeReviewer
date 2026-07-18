import React, { createContext, useState, useEffect } from 'react';
import { login as apiLogin, logout as apiLogout } from '../api/authApi';
import { getProfile } from '../api/userApi';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await getProfile();
          setUser(res.data);
        } catch (error) {
          console.error('Failed to fetch user context', error);
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
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

  const updateUser = (updatedUser) => {
    setUser((prev) => (prev ? { ...prev, ...updatedUser } : null));
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};
