import axios from 'axios';

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getProfile = async () => {
  const { data } = await axios.get('/api/users/profile', getConfig());
  return data;
};

export const updateSettings = async (settings) => {
  const { data } = await axios.put('/api/users/settings', settings, getConfig());
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await axios.get('/api/users/dashboard', getConfig());
  return data;
};
