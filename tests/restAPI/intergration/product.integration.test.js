import request from 'supertest';
import app from '../../src/app.js'; // Adjust the path if necessary

describe('Product API', () => {
  it('should create a new product', async () => {
    const response = await request(app)
      .post('/user/api/v1/product')
      .send({
        name: 'Test Product',
        price: 100,
      });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('name', 'Test Product');
  });

  // Add more tests as needed
});
