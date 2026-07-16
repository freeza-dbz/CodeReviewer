// Mocked auth API
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const login = async (credentials) => {
  await delay(800);
  if (credentials.email === 'test@example.com' && credentials.password === 'password') {
    return {
      token: 'mock-jwt-token-123',
      user: { id: 'u1', name: 'Test User', email: 'test@example.com', avatar: 'https://i.pravatar.cc/150?u=u1' },
    };
  }
  throw new Error('Invalid credentials. Try test@example.com / password');
};

export const signup = async (userData) => {
  await delay(800);
  return {
    token: 'mock-jwt-token-123',
    user: { id: 'u2', name: userData.name, email: userData.email, avatar: 'https://i.pravatar.cc/150?u=u2' },
  };
};

export const logout = async () => {
  await delay(300);
  return { success: true };
};
