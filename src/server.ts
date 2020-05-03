/*
 * Package Import
 */
import config from 'config';
import debug from 'debug';

/*
 * Local Import
 */
import app from './index';
import database from './database';

/*
 * Init
 */
const log = debug('{{ProjectName}}');
const { port } = config.get('Server');

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
database();

/*
 * Export
 */
export default server;
