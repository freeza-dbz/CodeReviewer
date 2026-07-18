import api from './axiosConfig';

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const getHistory = async (page = 1, limit = 10) => {
  const { data } = await api.get(`/api/reviews/history?page=${page}&limit=${limit}`, getConfig());
  return data;
};
