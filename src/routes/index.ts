/*
 * Package Import
 */
import { Application, Request, Response, Router } from 'express';
import config from 'config';

/*
 * Local Import
 */

/*
 * Init
 */
const apiRoutes = Router();

// index.html file
const indexPath: string = config.get('Path.index');

/*
 * Code
 */
const indexFile = (req: Request, res: Response) => {
  res.sendFile(indexPath);
};

/*
 * Routes
 */
export default (app: Application) => {
  /*
   * Basic Routes
   */
  app.get('/', indexFile);

  /*
   * Api Routes
   */
  app.use('/api', apiRoutes);
};
