import request from 'supertest';
import app from '../../src/app.js'; // Adjust the path if necessary

describe('Category API', () => {
  it('should create a new category', async () => {
    const response = await request(app)
      .post('/user/api/v1/category')
      .send({
        name: 'Test Category',
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test Category');
  });

  // Add more tests as needed
});
