import express from 'express';
import homeController from './controllers/homeController.js';
import authMiddleware from './middleware/auth.js';

const appRouter = express.Router();

appRouter.get('/', authMiddleware.getCurrentUser, homeController.fetch, homeController.render);

export default appRouter;
