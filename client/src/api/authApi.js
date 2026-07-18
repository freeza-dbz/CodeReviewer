import axios from 'axios';

export const login = async (credentials) => {
  const { data } = await axios.post('/api/auth/login', credentials);
  return data.data;
};

export const signup = async (userData) => {
  const { data } = await axios.post('/api/auth/signup', userData);
  return data.data;
};

export const logout = async () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      await axios.post('/api/auth/logout', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
    } catch (error) {
      console.error(error);
    }
  }
  return { success: true };
};
