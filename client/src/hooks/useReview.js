import { useState } from 'react';
import { submitReview, getReview, submitFolderReview } from '../api/reviewApi';
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

  const analyzeFolder = async (files, projectName = 'Default Project') => {
    if (!files || files.length === 0) {
      toast.error('Please provide a folder with files to review.');
      return;
    }

    const formData = new FormData();
    formData.append('projectName', projectName);
    files.forEach(f => {
      formData.append('files', f.raw, f.path);
    });

    setLoading(true);
    try {
      const response = await submitFolderReview(formData);
      setResult(response.data);
      toast.success('Folder review completed successfully!');
      return response.data;
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Failed to review folder');
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

  return { loading, result, analyzeCode, analyzeFolder, resetReview, loadReview };
};
