/*
 * Package Import
 */
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import serveStatic from 'serve-static';
import dotenv from 'dotenv';

/*
 * Local Import
 */
import * as errorHandlers from './middlewares/errorHandler';
import { isDev } from './utils';
import routes from './routes';

/*
 * Init
 */
const app = express();

// Dotenv
dotenv.config();

/*
 * Middlewares
 */

// Security
// See : http://expressjs.com/en/advanced/best-practice-security.html

// Helmet is actually just a collection of nine smaller middleware
// functions that set security-related HTTP headers:
app.use(helmet());

// Disable the X-Powered-By header.
// Attackers can use this header to detect apps running Express
// And then launch specifically-targeted attacks
app.disable('x-powered-by');

// Static Frontend Files
app.use(
  serveStatic(path.join(__dirname, 'public'), {
    index: false,
    maxAge: '30d',
  }),
);

// BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// CORS • API : https://github.com/expressjs/cors#configuration-options
app.use(cors());

// Logger • API : https://github.com/expressjs/morgan
// `dev` is equal to `:method :url :status :response-time ms`
if (isDev) {
  app.use(morgan('dev'));
}

/*
 * Routes
 */
routes(app);

/*
 * Error Handling •
 * These middlewares should be loaded after the loading the routes
 */

// 404 - Page Not Found
app.use(errorHandlers.notFound);

// This was a really bad error we didn't expect ! Shoot eh !
if (isDev) {
  // Development error handler - Prints stack trace
  app.use(errorHandlers.developmentErrors);
}

// Production error handler
app.use(errorHandlers.productionErrors);

/*
 * Export
 */
export default app;
