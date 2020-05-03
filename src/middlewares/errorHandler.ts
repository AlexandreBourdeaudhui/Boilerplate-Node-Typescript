/*
 * Package Import
 */
import status from 'http-status';
import { Request, Response, NextFunction } from 'express';

/*
 * Local Import
 */
import APIError from '../utils/APIError';

/*
 * Intefaces
 */
export interface ResponseError extends Error {
  message: string;
  status?: number;
  stack?: string;
}

/*
 * Catch Errors Handler
 *
 * With async/await, you need some way to catch errors.
 * Instead of using try { ... } catch (e) { ... } in each controller,
 * we wrap the function in catchErrors(), catch and errors they throw,
 * and pass it along to our express middleware with next()
 */
export const catchErrors = (fn: any) =>
  function (req: Request, res: Response, next: NextFunction) {
    return fn(req, res, next).catch(next);
  };

/*
 * 400 - Bad Request
 */
export const badRequest = (errMessage: string) =>
  new APIError(errMessage, status.BAD_REQUEST);

/*
 * 404 - Not Found
 */
export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const err = new APIError('Not Found', status.NOT_FOUND);
  next(err);
};

/*
 * Development Error Hanlder
 *
 * In development we show good error messages so if we hit a syntax error or
 * any other previously un-handled error, we can show good info on what happened
 */
// eslint-disable-next-line no-unused-vars
export const developmentErrors = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const errStack = err.stack || '';

  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: errStack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      '<mark>$&</mark>',
    ),
  };

  res.status(err.status || status.INTERNAL_SERVER_ERROR).json(errorDetails);
};

/*
 * Production Error Hanlder
 * No stacktraces are leaked to user
 */
// eslint-disable-next-line no-unused-vars
export const productionErrors = (
  err: ResponseError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  res.status(err.status || status.INTERNAL_SERVER_ERROR).json({
    message: err.message,
    error: {},
  });
};
