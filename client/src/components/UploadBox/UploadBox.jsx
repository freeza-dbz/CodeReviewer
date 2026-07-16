import React, { useRef } from 'react';
import { UploadCloud, FolderUp } from 'lucide-react';
import Button from '../Button/Button';

const UploadBox = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const handleClick = (ref) => ref.current?.click();

  return (
    <div className="border-2 border-dashed border-gray-700 hover:border-gray-500 transition-colors rounded-xl p-8 flex flex-col items-center justify-center text-center bg-gray-900/50">
      <div className="flex gap-4 mb-4">
        <div className="p-4 bg-gray-800 rounded-full text-blue-500">
          <UploadCloud className="w-8 h-8" />
        </div>
        <div className="p-4 bg-gray-800 rounded-full text-blue-500">
          <FolderUp className="w-8 h-8" />
        </div>
      </div>
      
      <h3 className="text-xl font-medium text-gray-200 mb-2">Upload your code</h3>
      <p className="text-gray-400 mb-6 text-sm max-w-sm">
        Drag and drop your files here, or click to browse. You can upload individual files or entire folders.
      </p>

      <div className="flex gap-4">
        <Button onClick={() => handleClick(fileInputRef)} variant="primary">
          Select Files
        </Button>
        <Button onClick={() => handleClick(folderInputRef)} variant="outline">
          Select Folder
        </Button>
      </div>

      <input
        type="file"
        multiple
        className="hidden"
        ref={fileInputRef}
        onChange={onFileUpload}
      />
      <input
        type="file"
        webkitdirectory="true"
        directory="true"
        className="hidden"
        ref={folderInputRef}
        onChange={onFileUpload}
      />
    </div>
  );
};

export default UploadBox;
