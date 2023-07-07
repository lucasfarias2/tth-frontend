import express from 'express';
import backofficeController from '../controllers/backofficeController.js';
import authMiddleware from '../middleware/auth.js';

const backofficeRouter = express.Router();

backofficeRouter.get(
  '*',
  authMiddleware.getCurrentUser,
  authMiddleware.requireAuth,
  authMiddleware.requireStaff,
  backofficeController.fetch,
  backofficeController.render
);

export default backofficeRouter;
