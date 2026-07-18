import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Code, Clock, Zap, CheckCircle, Eye } from 'lucide-react';
import Button from '../../components/Button/Button';
import { getDashboardStats } from '../../api/userApi';
import { formatDate } from '../../utils/formatDate';
import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  const isConfigMissing = !user?.apiKey || !user?.preferredModel;

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboardStats();
        setData(res.data);
      } catch (err) {
        console.error('Failed to load dashboard stats:', err);
        // If unauthorized, clear token and redirect to login
        if (err.response && err.response.status === 401) {
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  const stats = data ? [
    { label: 'Total Reviews', value: data.totalReviews, icon: Code, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Languages Used', value: data.languagesUsed, icon: Zap, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { label: 'Avg Review Score', value: data.avgScore, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Issues Found', value: data.issuesFound, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10' },
  ] : [];

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
      
      {isConfigMissing && (
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-4 mb-6 flex justify-between items-center">
          <div className="text-yellow-500 text-sm">
            <span className="font-bold">Configuration Required:</span> Please provide your LLM API Key and Preferred AI Model in the Settings page to perform code reviews.
          </div>
          <Button onClick={() => navigate('/settings')} size="sm" className="border border-yellow-500/30 text-yellow-500 hover:bg-yellow-500/20 bg-transparent">
            Go to Settings
          </Button>
        </div>
      )}

      {!data || loading ? (
        <div className="text-gray-400">Loading dashboard...</div>
      ) : (
        <>
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

          <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
            <div className="p-6 border-b border-gray-700">
              <h2 className="text-xl font-bold text-white">Recent Reviews</h2>
            </div>
            {data.recentReviews && data.recentReviews.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-gray-400">
                  <thead className="text-xs text-gray-300 uppercase bg-gray-900/50 border-b border-gray-700">
                    <tr>
                      <th className="px-6 py-4 font-medium">Project Name</th>
                      <th className="px-6 py-4 font-medium">Date</th>
                      <th className="px-6 py-4 font-medium">Language</th>
                      <th className="px-6 py-4 font-medium">Score</th>
                      <th className="px-6 py-4 font-medium text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentReviews.map((item) => (
                      <tr key={item.id} className="border-b border-gray-700/50 hover:bg-gray-750/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-gray-200">{item.project}</td>
                        <td className="px-6 py-4">{formatDate(item.date)}</td>
                        <td className="px-6 py-4">{item.language}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div className="w-full bg-gray-700 rounded-full h-1.5 max-w-[60px]">
                              <div className={`h-1.5 rounded-full ${item.score > 80 ? 'bg-green-500' : item.score > 50 ? 'bg-yellow-500' : 'bg-red-500'}`} style={{ width: `${item.score}%` }}></div>
                            </div>
                            <span>{item.score}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="sm" onClick={() => navigate(`/review/${item.id}`)}>
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No recent reviews to display.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
