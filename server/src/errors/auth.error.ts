interface IUnauthorizedError extends Error {
  statusCode: 401;
  isOperational: true;
}

export class UnauthorizedError extends Error implements IUnauthorizedError {
  public statusCode: 401 = 401;
  public isOperational: true = true;
  public static readonly defaultMessage: string = 'You are not authorized to access this resource.';

  constructor(message: string = UnauthorizedError.defaultMessage) {
    super(message);
    Object.setPrototypeOf(this, UnauthorizedError.prototype);
    Error.captureStackTrace(this, this.constructor);
  }
}
