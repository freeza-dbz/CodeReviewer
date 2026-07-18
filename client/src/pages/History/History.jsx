import React, { useEffect, useState } from 'react';
import { getHistory } from '../../api/historyApi';
import { formatDate } from '../../utils/formatDate';
import { Eye } from 'lucide-react';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await getHistory();
        setHistory(res.data.items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Review History</h1>
        <p className="text-gray-400">View and manage your past code reviews.</p>
      </div>

      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-gray-400">
            <thead className="text-xs text-gray-300 uppercase bg-gray-900/50 border-b border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium">Project Name</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Language</th>
                <th className="px-6 py-4 font-medium">Score</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">Loading history...</td>
                </tr>
              ) : history.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-8 text-center">No history found.</td>
                </tr>
              ) : (
                history.map((item) => (
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
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                        item.status === 'Completed' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-red-500/10 text-red-500 border-red-500/20'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="sm" onClick={() => navigate(`/review/${item.id}`)}>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-700 flex items-center justify-between text-sm text-gray-400">
          <div>Showing 1 to 5 of 50 entries</div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm">Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
