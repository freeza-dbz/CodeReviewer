import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Copy, CheckCircle2 } from 'lucide-react';
import SeverityBadge from '../SeverityBadge/SeverityBadge';
import { copyCode } from '../../utils/copyCode';

const IssueCard = ({ issue }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden transition-all">
      <div 
        className="p-4 flex items-center justify-between cursor-pointer hover:bg-gray-750 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-4 flex-1">
          {expanded ? <ChevronDown className="w-5 h-5 text-gray-400" /> : <ChevronRight className="w-5 h-5 text-gray-400" />}
          <SeverityBadge severity={issue.severity} />
          <div className="flex-1">
            <h4 className="text-gray-200 font-medium">{issue.title}</h4>
            <div className="flex gap-3 text-xs text-gray-500 mt-1">
              <span>{issue.file}</span>
              <span>•</span>
              <span>Line {issue.line}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {issue.suggestion && (
            <span className="flex items-center gap-1 text-xs text-green-500 bg-green-500/10 px-2 py-1 rounded">
              <CheckCircle2 className="w-3 h-3" /> Fix Available
            </span>
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 border-t border-gray-700 bg-gray-800/50">
          <p className="text-gray-300 text-sm mb-4">{issue.description}</p>
          
          {issue.suggestion && (
            <div className="bg-gray-900 rounded-md p-3 relative group">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Suggested Fix</span>
                <button 
                  onClick={(e) => { e.stopPropagation(); copyCode(issue.suggestion); }}
                  className="text-gray-500 hover:text-gray-300 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
              <code className="text-sm text-green-400 font-mono whitespace-pre-wrap block">
                {issue.suggestion}
              </code>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IssueCard;
