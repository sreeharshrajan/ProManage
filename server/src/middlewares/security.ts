import { Request, Response, NextFunction, RequestHandler } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import mongoSanitize from 'express-mongo-sanitize';
import { xss } from 'express-xss-sanitizer';
import cors, { CorsOptions } from 'cors';
import { logger } from '../utils/logger.util';

// Rate limiting configuration
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req: Request, res: Response) => {
    logger.warn(`Rate limit exceeded for IP: ${req.ip}`);
    res.status(429).json({
      status: 'error',
      message: 'Too many requests, please try again later'
    });
  }
});

// Security middleware stack
export const securityMiddleware: RequestHandler[] = [
    // sanitize data
  mongoSanitize({
    replaceWith: '_',
    onSanitize: ({ req, key }) => {
      logger.warn(`Sanitized MongoDB injection attempt in ${req.url} at ${key}`);
    }
  }),

  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", 'data:'],
        connectSrc: ["'self'"]
      }
    },
    crossOriginEmbedderPolicy: false
  }),

  xss({
    allowedKeys: ['name', 'email'],
    allowedTags: ['b', 'i', 'em', 'strong'],
    allowedAttributes: {
      a: ['href', 'title']
    }
  }),

  hpp({
    whitelist: ['sort', 'limit', 'page']
  }),

  (req: Request, res: Response, next: NextFunction) => {
    if (req.path.startsWith('/api')) {
      apiLimiter(req, res, next);
    } else {
      next();
    }
  }
];

// CORS configuration
export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];
    
    if (!origin) return callback(null, true);
    
    if (process.env.NODE_ENV === 'development') {
      const localhostRegex = /^https?:\/\/(localhost|127\.0\.0\.1)(:\d{1,5})?$/;
      if (localhostRegex.test(origin)) return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) return callback(null, true);
    
    logger.warn(`CORS blocked for origin: ${origin}`);
    callback(new Error('Not allowed by CORS'));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  credentials: true,
  maxAge: 86400
};

export const corsMiddleware = cors(corsOptions);

export const contentTypeMiddleware: RequestHandler = (_req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
};

export const securityHeaders: RequestHandler = (_req, res, next) => {
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
};
