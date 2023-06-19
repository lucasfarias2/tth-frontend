import express from 'express';
import homeController from './controllers/homeController.js';
import loginController from './controllers/loginController.js';
import signupController from './controllers/signupController.js';
import authMiddleware from './middleware/auth.js';
import withQueryMiddleware from './middleware/withQuery.js';
import accountRouter from './routers/accountRouter.js';

const appRouter = express.Router();

appRouter.use(withQueryMiddleware);

appRouter.get('/', authMiddleware.getCurrentUser, homeController.fetch, homeController.render);
appRouter.get('/login', authMiddleware.getCurrentUser, loginController.fetch, loginController.render);
appRouter.get('/signup', authMiddleware.getCurrentUser, signupController.fetch, signupController.render);
appRouter.use('/account', accountRouter);

export default appRouter;
