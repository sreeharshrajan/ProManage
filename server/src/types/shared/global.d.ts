import 'express';
import { UserPayload } from '../api/auth';

declare module 'express-serve-static-core' {
  interface Request {
    validatedData?: unknown;
    user?: UserPayload;
    requestId?: string;
  }
}
