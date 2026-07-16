export const SEVERITIES = {
  CRITICAL: 'critical',
  HIGH: 'high',
  MEDIUM: 'medium',
  LOW: 'low',
  INFO: 'info',
};

export const SEVERITY_COLORS = {
  [SEVERITIES.CRITICAL]: 'bg-red-500/10 text-red-500 border-red-500/20',
  [SEVERITIES.HIGH]: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
  [SEVERITIES.MEDIUM]: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
  [SEVERITIES.LOW]: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  [SEVERITIES.INFO]: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
};

export const SEVERITY_ORDER = {
  [SEVERITIES.CRITICAL]: 1,
  [SEVERITIES.HIGH]: 2,
  [SEVERITIES.MEDIUM]: 3,
  [SEVERITIES.LOW]: 4,
  [SEVERITIES.INFO]: 5,
};
