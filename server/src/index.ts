import express from 'express';
import dotenv from 'dotenv';
import { securityMiddleware, contentTypeMiddleware, securityHeaders,corsMiddleware  } from './middlewares/security';
import { httpLogger, errorLogger } from './utils/logger.util';
import connectToMongo from './config/db.config';
import userRoutes from './routes/user.routes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

// Custom Middleware
import { responseFormatter } from './utils/http/response.util';
import { errorHandler } from './errors/handler.error';
import { notFound } from './middlewares/not-found.middleware';

dotenv.config();

const app = express();

// Security Middleware
app.use(securityMiddleware);
app.use(corsMiddleware);
app.use(contentTypeMiddleware);
app.use(securityHeaders);

// Logging
app.use(httpLogger);

// Body parsers with size limits
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Response formatting
app.use(responseFormatter);

// Routes
app.use('/api/users', userRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// 404 handler
app.use(notFound);

// Error logging
app.use(errorLogger);

// Global error handler
app.use(errorHandler);

// Start Server
const initServer = async () => {
  try {
    await connectToMongo();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`🌍 Server running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`);
      console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
};

initServer();