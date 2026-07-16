import React from 'react';
import { File, Folder } from 'lucide-react';

const FileExplorer = ({ files, activeFile, onSelectFile }) => {
  if (!files || files.length === 0) {
    return <div className="text-gray-500 p-4 text-sm">No files uploaded.</div>;
  }

  return (
    <div className="flex flex-col gap-1 p-2">
      {files.map((file, idx) => (
        <button
          key={idx}
          onClick={() => onSelectFile(file)}
          className={`flex items-center gap-2 px-3 py-2 rounded text-sm text-left transition-colors ${
            activeFile?.name === file.name
              ? 'bg-blue-600/10 text-blue-400 font-medium'
              : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
          }`}
        >
          <File className="w-4 h-4" />
          <span className="truncate">{file.path || file.name}</span>
        </button>
      ))}
    </div>
  );
};

export default FileExplorer;
