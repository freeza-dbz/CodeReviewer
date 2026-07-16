import { useState } from 'react';
import { submitReview } from '../api/reviewApi';
import toast from 'react-hot-toast';

export const useReview = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const analyzeCode = async (code, language) => {
    if (!code?.trim()) {
      toast.error('Please provide code to review.');
      return;
    }
    
    setLoading(true);
    try {
      const response = await submitReview({ code, language });
      setResult(response.data);
      toast.success('Review completed successfully!');
    } catch (err) {
      toast.error(err.message || 'Failed to review code');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const resetReview = () => setResult(null);

  return { loading, result, analyzeCode, resetReview };
};
