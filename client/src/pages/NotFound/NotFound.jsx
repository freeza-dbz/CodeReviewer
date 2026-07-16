import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';

const NotFound = () => {
  return (
    <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-950 text-center px-4">
      <h1 className="text-9xl font-bold text-blue-500 mb-4">404</h1>
      <h2 className="text-3xl font-bold text-white mb-4">Page Not Found</h2>
      <p className="text-gray-400 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button size="lg">Return to Dashboard</Button>
      </Link>
    </div>
  );
};

export default NotFound;
