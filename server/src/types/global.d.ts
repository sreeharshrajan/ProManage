declare global {
  type ID = string | number;

  namespace Express {
    interface Request {
      user?: {
        id: string;
        role?: string;
      };
      requestId?: string;
    }
  }
}