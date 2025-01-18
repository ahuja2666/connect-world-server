import express, { Application, ErrorRequestHandler } from "express";
import { json, urlencoded } from "body-parser";
import morgan from "morgan"; // If you want to log HTTP requests (npm install morgan)
import { mainRouter } from "./routes"; // index.ts router
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger"; 


export const app: Application = express();

// Middleware
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(morgan("dev")); // log requests (optional)

// Routes
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", mainRouter);


// 1) Create a typed error handler function
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error("Global Error Handler:", err);

  const statusCode = err?.statusCode || 500;
  return res.status(statusCode).json({
    success: false,
    message: err?.message || "Internal Server Error",
  }) as unknown as void;
};

// 2) Plug it into Express after all routes
app.use(errorHandler);