import React from 'react';
import { SEVERITY_COLORS } from '../../constants/severity';

const SeverityBadge = ({ severity }) => {
  const normalizedSeverity = severity?.toLowerCase() || 'info';
  const colorClass = SEVERITY_COLORS[normalizedSeverity] || SEVERITY_COLORS.info;

  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${colorClass} capitalize inline-flex items-center`}>
      {normalizedSeverity}
    </span>
  );
};

export default SeverityBadge;
