/*
 * Package Import
 */
import debug from 'debug';

/*
 * Local Import
 */
import app from './index';
import initializeDatabase from './database';

/*
 * Init
 */
const log = debug('{{ProjectName}}');

/*
 * Code
 */
const port = process.env.NODE_PORT || 3000;

/*
 * Server • Node.js
 */
const server = app.listen(port, () => {
  log(`Node.js is running on port : ${port}`);
  log(`→ ENV : ${process.env.NODE_ENV}`);
});

/*
 * Database • Mongoose
 */
initializeDatabase();

/*
 * Export
 */
export default server;
