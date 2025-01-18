// src/config/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";

// Basic metadata for your API
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My Express API",
    version: "1.0.0",
    description: "A simple Express API with Swagger",
  },
  servers: [
    {
      url: `${process.env.BASE_PATH || 'prod'}/api`, // You can change /api to your base path
    },
  ],
};

const options = {
  swaggerDefinition,
  // Paths to files where you have OpenAPI definitions (e.g., JSDoc/annotations)
  apis: ["./src/routes/*.ts", "./src/models/*.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
