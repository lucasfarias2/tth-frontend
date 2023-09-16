import express from 'express';
import homeController from './controllers/home-controller.js';

const appRouter = express.Router();

appRouter.get('/', homeController.fetch, homeController.render);

export default appRouter;
