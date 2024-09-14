import request from 'supertest';
import express from 'express';
import userRoutes from '../../src/restAPI/routes/authRoutes.js'; // Adjust the path as needed
import db from '../../src/common/config/database.js'; // Adjust the path as needed

// Initialize the app
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Import and apply your routes
userRoutes(app);

// Mock data and setup
const mockUser = {
  username: 'testuser',
  password: 'testpassword',
  email: 'testuser@example.com',
};

beforeAll(async () => {
  await db.connectDB();
});

afterAll(async () => {
  await db.sequelize.close();
});

describe('User API', () => {
  it('should register a new user', async () => {
    const response = await request(app)
      .post('/user/api/v1/register')
      .send(mockUser);

    expect(response.status).toBe(201); // Adjust the status code as needed
    expect(response.body).toHaveProperty('id'); // Check for user ID or any other property
  });

  it('should login a user', async () => {
    // First, ensure the user is registered
    await request(app).post('/user/api/v1/register').send(mockUser);

    // Now attempt to login
    const response = await request(app)
      .post('/user/api/v1/login')
      .send({
        username: mockUser.username,
        password: mockUser.password,
      });

    expect(response.status).toBe(200); // Adjust the status code as needed
    expect(response.body).toHaveProperty('token'); // Assuming the login returns a token
  });

  // Add more tests as needed, e.g., for invalid cases or authorization checks
});
