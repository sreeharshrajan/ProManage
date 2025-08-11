import 'express';

declare module 'express-serve-static-core' {
  interface Request {
    validatedData?: unknown;
    user?: {
      id: string;
      email?: string;
      name?: string;
      role?: string | undefined;
    };
    requestId?: string;
  }
}
