import api from './axiosConfig';

export const login = async (credentials) => {
  const { data } = await api.post('/api/auth/login', credentials);
  return data.data;
};

export const signup = async (userData) => {
  const { data } = await api.post('/api/auth/signup', userData);
  return data.data;
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await api.post('/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error(error);
    }
  }
  return { success: true };
};
