import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Terminal } from 'lucide-react';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="h-16 bg-gray-900 border-b border-gray-800 flex items-center justify-between px-6 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-3 text-blue-500">
        <Terminal className="w-6 h-6" />
        <span className="text-xl font-bold tracking-tight text-white">AI Code Reviewer</span>
      </div>
      <div className="flex items-center gap-4">
        {user && (
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-400">Welcome, <span className="text-gray-200">{user.name}</span></span>
            <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-gray-700" />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
