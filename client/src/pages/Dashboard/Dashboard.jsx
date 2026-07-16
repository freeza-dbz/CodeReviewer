import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Clock, Zap, CheckCircle } from 'lucide-react';
import Button from '../../components/Button/Button';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Reviews', value: '128', icon: Code, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Languages Used', value: '6', icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Avg Review Time', value: '1.2s', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Issues Fixed', value: '452', icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Welcome back! Here's an overview of your code reviews.</p>
        </div>
        <Button onClick={() => navigate('/review')} size="lg" className="shadow-lg shadow-blue-500/20">
          New Review
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-gray-800 border border-gray-700 rounded-xl p-6 flex items-center gap-4">
            <div className={`p-4 rounded-lg ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-gray-400 font-medium">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-4">Recent Reviews</h2>
        <div className="text-center py-12 text-gray-400">
          <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No recent reviews to display.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
