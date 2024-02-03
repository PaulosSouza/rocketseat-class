export class AppError {
  message: string

  constructor(message: string) {
    this.message = message
  }
}

export function isAppError(error: unknown): error is AppError {
  return error instanceof AppError
}
