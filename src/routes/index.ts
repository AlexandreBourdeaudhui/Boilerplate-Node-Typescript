/*
 * Package Import
 */
import { Application, Request, Response, Router } from 'express';

/*
 * Local Import
 */

/*
 * Init
 */
const apiRoutes = Router();

/*
 * Routes
 */
export default (app: Application) => {
  /*
   * Basic Routes
   */
  app.get('/', (req: Request, res: Response) => {
    res.send('Hello');
  });

  /*
   * Api Routes
   */
  app.use('/api', apiRoutes);
};
