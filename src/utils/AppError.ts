// src/utils/AppError.ts

export class AppError extends Error {
  public readonly statusCode: number;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;

    // Restore prototype chain (for TS)
    Object.setPrototypeOf(this, AppError.prototype);
  }
}
