import { SEVERITY_ORDER } from '../constants/severity';

export const severitySort = (issues) => {
  if (!issues) return [];
  return [...issues].sort((a, b) => {
    const orderA = SEVERITY_ORDER[a.severity?.toLowerCase()] || 99;
    const orderB = SEVERITY_ORDER[b.severity?.toLowerCase()] || 99;
    return orderA - orderB;
  });
};
