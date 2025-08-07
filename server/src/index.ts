import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import { connectToMongo } from './config/db';
import userRoutes from './routes/userRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './docs/swagger';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Error handler for JSON parsing
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction): void => {
  if (err instanceof SyntaxError && 'body' in err) {
    res.status(400).json({ message: 'Invalid JSON payload' });
    return;
  }

  // Optionally handle unexpected errors here, or just call next
  res.status(500).json({ message: 'Unexpected error occurred' });
});

// Global fallback error handler
app.use((err: any, _req: express.Request, res: express.Response, _next: express.NextFunction): void => {
  console.error('Unhandled error:', err);

  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message || err : undefined,
  });
});



// Swagger Docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/users', userRoutes);
app.get('/', (_req, res): void => {
  res.status(200).json({ message: '🚀 Server is up and running' });
});

// Server Start
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