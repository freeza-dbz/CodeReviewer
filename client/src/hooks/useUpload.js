import { useState } from 'react';
import toast from 'react-hot-toast';

export const useUpload = () => {
  const [files, setFiles] = useState([]);

  const handleFileUpload = (event) => {
    const uploadedFiles = Array.from(event.target.files);
    if (!uploadedFiles.length) return;

    // Just store references for the mock
    setFiles((prev) => [...prev, ...uploadedFiles.map(f => ({
      name: f.name,
      path: f.webkitRelativePath || f.name,
      size: f.size,
      raw: f
    }))]);
    toast.success(`${uploadedFiles.length} file(s) uploaded`);
  };

  const clearFiles = () => setFiles([]);

  return { files, handleFileUpload, clearFiles };
};
