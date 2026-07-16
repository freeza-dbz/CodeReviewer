const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getHistory = async (page = 1, limit = 10) => {
  await delay(800);
  
  const mockData = [
    { id: '101', date: '2026-07-15T10:00:00Z', project: 'auth-service', language: 'JavaScript', status: 'Completed', score: 85 },
    { id: '102', date: '2026-07-14T14:30:00Z', project: 'payment-gateway', language: 'TypeScript', status: 'Completed', score: 92 },
    { id: '103', date: '2026-07-12T09:15:00Z', project: 'user-dashboard', language: 'Python', status: 'Failed', score: 0 },
    { id: '104', date: '2026-07-10T16:45:00Z', project: 'data-pipeline', language: 'Go', status: 'Completed', score: 78 },
    { id: '105', date: '2026-07-08T11:20:00Z', project: 'mobile-api', language: 'Java', status: 'Completed', score: 88 },
  ];

  return {
    success: true,
    data: {
      items: mockData,
      total: 50,
      page,
      limit,
      totalPages: 5
    }
  };
};
