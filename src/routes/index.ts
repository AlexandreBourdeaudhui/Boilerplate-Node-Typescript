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
   * @route "/"
   */
  app.get('/', (req: Request, res: Response) => {
    res.render('home', {
      title: 'Home title',
      description: 'Home description',
    });
  });

  /*
   * Api Routes
   */
  app.use('/api', apiRoutes);
};
