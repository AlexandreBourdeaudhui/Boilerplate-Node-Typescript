/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export default class APIError extends Error {
  message: string;
  status: number;

  /**
   * Create an API error.
   * @param {String} message - Error error.
   * @param {Number} status - HTTP-Status code of error.
   */
  constructor(message: string, status: number) {
    super(message);

    this.message = message;
    this.status = status;

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error(message).stack;
    }
  }
}
