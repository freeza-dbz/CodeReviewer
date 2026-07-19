import { useState } from 'react';
import { submitReview, getReview } from '../api/reviewApi';
import toast from 'react-hot-toast';

export const useReview = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeCode = async (code, language, projectName = 'Default Project') => {
    if (!code?.trim()) {
      toast.error('Please provide code to review.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await submitReview({ code, language, projectName });
      setResult(response.data);
      toast.success('Review completed successfully!');
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to review code');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const resetReview = () => setResult(null);

  const loadReview = async (id) => {
    setLoading(true);
    try {
      const response = await getReview(id);
      setResult(response.data);
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to load review');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  return { loading, result, analyzeCode, resetReview, loadReview };
};
