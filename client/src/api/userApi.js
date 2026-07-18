import api from './axiosConfig';

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getProfile = async () => {
  const { data } = await api.get('/api/users/profile', getConfig());
  return data;
};

export const updateSettings = async (settings) => {
  const { data } = await api.put('/api/users/settings', settings, getConfig());
  return data;
};

export const getDashboardStats = async () => {
  const { data } = await api.get('/api/users/dashboard', getConfig());
  return data;
};
