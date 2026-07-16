import React from 'react';
import IssueCard from '../IssueCard/IssueCard';
import { severitySort } from '../../utils/severitySort';

const IssueList = ({ issues }) => {
  if (!issues || issues.length === 0) {
    return (
      <div className="text-center p-8 bg-gray-800/50 rounded-xl border border-gray-800">
        <p className="text-gray-400">No issues found. Great job!</p>
      </div>
    );
  }

  const sortedIssues = severitySort(issues);

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold text-gray-200 mb-2">Identified Issues ({issues.length})</h3>
      {sortedIssues.map((issue) => (
        <IssueCard key={issue.id} issue={issue} />
      ))}
    </div>
  );
};

export default IssueList;
