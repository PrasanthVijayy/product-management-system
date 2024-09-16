// src/common/config/swaggerOptions.js
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Product Management API",
      version: "1.0.0",
      description: "API documentation for Product and Category Management",
    },
    servers: [
      {
        url: "http://localhost:3000", // Adjust according to your environment
      },
    ],
  },
  apis: [
    "./src/restAPI/routes/*.js", // Path to your API route files
    "./src/common/models/*.js",
  ],
};

const swaggerDocs = swaggerJsdoc(options);

export { swaggerDocs };
