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
  /**
   * Homepage
   * @method GET
   * @routes "/"
   */
  app.get('/', (req: Request, res: Response) => {
    res.render('home');
  });

  /*
   * Api Routes
   */
  app.use('/api', apiRoutes);
};
