// jest.setup.js
import '@testing-library/jest-dom';

// Example: Mocking Redis
jest.mock('redis', () => {
    const mRedisClient = {
      connect: jest.fn(),
      set: jest.fn(),
      get: jest.fn(),
      del: jest.fn(),
    };
    return { createClient: () => mRedisClient };
  });
  
  // Example: Mocking environment variables
  process.env.JWT_SECRET = 'mocked-secret';
  process.env.DB_NAME = 'inventory';
  