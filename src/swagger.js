import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Product Management API',
      version: '1.0.0',
      description: 'This is the API documentation for the Product Management System',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}`,
        description: 'Local server',
      },
    ],
  },
  apis: ['./src/restAPI/routes/*.js'], // Path to the API docs
};

const swaggerDocs = swaggerJsDoc(options);

export { swaggerUi, swaggerDocs };
