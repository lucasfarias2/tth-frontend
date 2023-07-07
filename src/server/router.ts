import express from 'express';
import homeController from './controllers/homeController.js';
import authMiddleware from './middleware/auth.js';
import withQueryMiddleware from './middleware/withQuery.js';
import accountRouter from './routers/accountRouter.js';
import backofficeRouter from './routers/backofficeRouter.js';

const appRouter = express.Router();

appRouter.use(withQueryMiddleware);

appRouter.get('/', authMiddleware.getCurrentUser, homeController.fetch, homeController.render);
appRouter.get('/contact', authMiddleware.getCurrentUser, homeController.fetch, homeController.render);
appRouter.get('/roadmap', authMiddleware.getCurrentUser, homeController.fetch, homeController.render);
appRouter.get('/login', authMiddleware.getCurrentUser, authMiddleware.requireGuest, homeController.render);
appRouter.get('/signup', authMiddleware.getCurrentUser, authMiddleware.requireGuest, homeController.render);

appRouter.use('/account', accountRouter);
appRouter.use('/backoffice', backofficeRouter);

export default appRouter;
