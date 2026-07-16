const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const getProfile = async () => {
  await delay(600);
  return {
    success: true,
    data: {
      id: 'u1',
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://i.pravatar.cc/150?u=u1',
      joinedDate: '2025-01-15T00:00:00Z',
      totalReviews: 128,
      preferredLanguage: 'JavaScript',
    }
  };
};

export const updateSettings = async (settings) => {
  await delay(800);
  return {
    success: true,
    data: settings
  };
};
