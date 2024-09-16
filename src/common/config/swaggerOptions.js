import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";

dotenv.config();

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
        url: `http://localhost:${process.env.PORT || 3001}`,
        description: "Local server",
      },
    ],
  },
  apis: ["./src/restAPI/routes/*.js", "./src/common/models/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);

export { swaggerUi, swaggerDocs };
