const delay = (ms) => new Promise((res) => setTimeout(res, ms));

export const submitReview = async (payload) => {
  // payload: { code, language }
  await delay(1500); // Simulate AI processing

  return {
    success: true,
    data: {
      summary: "The code is generally functional but lacks error handling and has some minor performance bottlenecks. Consider optimizing the nested loops and adding try-catch blocks.",
      issues: [
        {
          id: '1',
          severity: 'critical',
          category: 'Security',
          title: 'SQL Injection Vulnerability',
          description: 'Direct string concatenation in SQL query.',
          suggestion: 'Use parameterized queries or an ORM.',
          file: 'database.js',
          line: 24,
        },
        {
          id: '2',
          severity: 'high',
          category: 'Performance',
          title: 'Unused Promise',
          description: 'A promise is created but never awaited or returned.',
          suggestion: 'Await the promise or handle it asynchronously.',
          file: 'auth.js',
          line: 45,
        },
        {
          id: '3',
          severity: 'medium',
          category: 'Maintainability',
          title: 'Poor Variable Naming',
          description: 'Variable name "x" is not descriptive.',
          suggestion: 'Rename to "userIndex" or similar.',
          file: 'login.js',
          line: 12,
        },
        {
          id: '4',
          severity: 'low',
          category: 'Style',
          title: 'Missing Semicolon',
          description: 'Statement ends without a semicolon.',
          suggestion: 'Add semicolon.',
          file: 'app.js',
          line: 88,
        }
      ],
      stats: {
        totalIssues: 4,
        critical: 1,
        high: 1,
        medium: 1,
        low: 1,
        estimatedFixTime: '45 mins',
        score: 72,
        tokensUsed: 1250,
        model: 'GPT-4o Mock',
        responseTime: '1.5s'
      }
    }
  };
};

export const getReview = async (id) => {
  await delay(500);
  // Return mocked data similar to submitReview
  return await submitReview({ code: '', language: 'javascript' });
};
