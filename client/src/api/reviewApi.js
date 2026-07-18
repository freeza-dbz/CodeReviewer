import api from './axiosConfig';

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const submitReview = async (payload) => {
  const { data } = await api.post('/api/reviews', payload, getConfig());
  return data;
};

export const getReview = async (id) => {
  const { data } = await api.get(`/api/reviews/${id}`, getConfig());
  return data;
};
