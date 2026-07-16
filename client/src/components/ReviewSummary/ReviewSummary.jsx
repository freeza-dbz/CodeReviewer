import React from 'react';
import { ShieldAlert, AlertTriangle, Info, CheckCircle2 } from 'lucide-react';

const ReviewSummary = ({ stats, summary }) => {
  if (!stats) return null;

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
      <div className="flex items-start justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-100 mb-2">Review Complete</h2>
          <p className="text-gray-400 max-w-2xl">{summary}</p>
        </div>
        <div className="flex flex-col items-end">
          <div className="text-4xl font-bold text-blue-500 mb-1">{stats.score}<span className="text-xl text-gray-500">/100</span></div>
          <div className="text-sm text-gray-400">Review Score</div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <StatCard icon={ShieldAlert} label="Critical" value={stats.critical} color="text-red-500" bg="bg-red-500/10" />
        <StatCard icon={AlertTriangle} label="High" value={stats.high} color="text-orange-500" bg="bg-orange-500/10" />
        <StatCard icon={AlertTriangle} label="Medium" value={stats.medium} color="text-yellow-500" bg="bg-yellow-500/10" />
        <StatCard icon={Info} label="Low" value={stats.low} color="text-blue-500" bg="bg-blue-500/10" />
        <StatCard icon={CheckCircle2} label="Est. Fix Time" value={stats.estimatedFixTime} color="text-green-500" bg="bg-green-500/10" />
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <div className={`p-4 rounded-lg border border-gray-700 ${bg} flex flex-col items-center justify-center text-center`}>
    <Icon className={`w-6 h-6 ${color} mb-2`} />
    <div className={`text-2xl font-bold ${color} mb-1`}>{value}</div>
    <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">{label}</div>
  </div>
);

export default ReviewSummary;
