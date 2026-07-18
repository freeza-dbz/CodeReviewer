import axios from 'axios';

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
});

export const submitReview = async (payload) => {
  const { data } = await axios.post('/api/reviews', payload, getConfig());
  return data;
};

export const getReview = async (id) => {
  const { data } = await axios.get(`/api/reviews/${id}`, getConfig());
  return data;
};
