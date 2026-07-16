import toast from 'react-hot-toast';

export const copyCode = async (code) => {
  try {
    await navigator.clipboard.writeText(code);
    toast.success('Code copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy code.');
  }
};
