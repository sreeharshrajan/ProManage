export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;
  public details?: any;

  constructor(
    message: string,
    statusCode: number = 500,
    details?: any,
    isOperational: boolean = true
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.isOperational = isOperational;

    if (details) {
      this.message += ': ' + JSON.stringify(details);
    }

    Error.captureStackTrace(this, this.constructor);
  }

  static handle(err: any, res: any) {
    if (err instanceof AppError) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
        ...(err.details && { details: err.details })
      });
    }

    // Handle unexpected errors
    console.error('Unexpected error:', err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error'
    });
  }
}

export class ValidationError extends AppError {
  constructor(message: string, details?: any) {
    super(message, 400, details, true);
  }
}

export class NotFoundError extends AppError {
  constructor(message: string = 'Resource not found') {
    super(message, 404, undefined, true);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message: string = 'Unauthorized access') {
    super(message, 401, undefined, true);
  }
}