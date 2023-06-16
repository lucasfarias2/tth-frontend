import express from 'express';
import accountController from '../controllers/accountController.js';
import authMiddleware from '../middleware/auth.js';

const accountRouter = express.Router();

accountRouter.get(
  '*',
  authMiddleware.getCurrentUser,
  authMiddleware.requireAuth,
  accountController.fetch,
  accountController.render
);

export default accountRouter;
