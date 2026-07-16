import React from 'react';
import { Loader2 } from 'lucide-react';

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      <span className="text-gray-400 font-medium">{text}</span>
    </div>
  );
};

export default Loader;
